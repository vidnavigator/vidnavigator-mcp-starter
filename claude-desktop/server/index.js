#!/usr/bin/env node
/**
 * VidNavigator MCP Server for Claude Desktop Extensions
 *
 * A thin stdio relay to the hosted VidNavigator MCP server
 * (https://api.vidnavigator.com/mcp/). Claude Desktop talks to this process
 * over stdio; every tools/list and tools/call is forwarded to the hosted
 * server with the user's API key. The tool list therefore always matches the
 * hosted server's, and new tools arrive without a new extension release.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

// VIDNAVIGATOR_MCP_URL is for local testing only; it is not exposed in the manifest.
const MCP_URL = process.env.VIDNAVIGATOR_MCP_URL || 'https://api.vidnavigator.com/mcp/';
const API_KEY = process.env.API_KEY;
// Long-running tools return a task_id at once, so a call only waits this long
// for the synchronous tools (an AI-ranked YouTube search can take a minute).
const REQUEST_TIMEOUT_MS = 120000;
const VERSION = '2.0.0';

let nextRequestId = 1;

/** Send one JSON-RPC request to the hosted server and return its `result`. */
async function callHostedServer(method, params) {
  if (!API_KEY) {
    throw new McpError(
      ErrorCode.InvalidRequest,
      'No VidNavigator API key configured. Add it in the extension settings (get one at https://vidnavigator.com/studio/api).'
    );
  }

  let response;
  try {
    response = await fetch(MCP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
        'User-Agent': `vidnavigator-claude-desktop/${VERSION}`,
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: nextRequestId++, method, params }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    const reason = error.name === 'TimeoutError'
      ? `no answer after ${REQUEST_TIMEOUT_MS / 1000} seconds`
      : error.message;
    throw new McpError(ErrorCode.InternalError, `Could not reach VidNavigator (${reason}). Please try again.`);
  }

  let body;
  try {
    body = await response.json();
  } catch {
    throw new McpError(ErrorCode.InternalError, `VidNavigator returned an unreadable response (HTTP ${response.status}).`);
  }

  if (body.error) {
    throw new McpError(body.error.code ?? ErrorCode.InternalError, body.error.message || 'VidNavigator request failed.');
  }
  return body.result;
}

class VidNavigatorServer {
  constructor() {
    this.server = new Server(
      { name: 'vidnavigator', version: VERSION },
      { capabilities: { tools: {} } }
    );

    // Tool errors (bad arguments, insufficient credits, ...) come back from the
    // hosted server as a normal result whose text says what went wrong, so the
    // assistant can read and act on them. Only transport failures throw.
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const result = await callHostedServer('tools/list', {});
      return { tools: result?.tools ?? [] };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      const result = await callHostedServer('tools/call', { name, arguments: args ?? {} });
      return { content: result?.content ?? [] };
    });

    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`VidNavigator MCP relay running on stdio, forwarding to ${MCP_URL}`);
  }
}

const server = new VidNavigatorServer();
server.run().catch((error) => {
  console.error('Failed to start the VidNavigator MCP relay:', error);
  process.exit(1);
});
