# 🎥 VidNavigator MCP Server

AI-powered video search, transcription, analysis and data extraction through the Model Context Protocol (MCP). Available for both **Cursor** and **Claude Desktop**, and for any MCP client through the hosted server at `https://api.vidnavigator.com/mcp/`.

## 🚀 Features

- 🔍 **AI Video Search**: AI-ranked YouTube search with year, duration and purpose filters
- 📝 **Transcripts and Transcription**: Transcripts from YouTube, TikTok, X, Facebook, Vimeo and more, and speech-to-text for videos without captions (Instagram included), of any length
- 📽️ **Video Analysis**: Summaries and Q&A on any video, with follow-up questions
- 🧩 **Data Extraction**: Structured data extracted from a video into the fields you define
- 🐦 **Tweet Claim Analysis**: The core claim of an X/Twitter post, ready to fact-check
- 🎵 **TikTok**: Keyword search with sort, date and popularity filters, and profile scrapes
- 📁 **Your Files**: Search, analyze and extract data from the files you uploaded to VidNavigator
- 📊 **Usage Tracking**: Your credit balance and activity

Long-running tools (transcription, extraction, tweet analysis, TikTok) run as background jobs: the assistant gets a `task_id` and polls `get_task_status` until the result is ready.

## 📋 Quick Start

### For Cursor Users

**⚡ Quick Setup (2 minutes)**

1. 🗝 [Get your free API key](https://vidnavigator.com) → User → Dev-tools
2. Open Cursor → Settings → Tools and integration → Add MCP server, then paste:

```jsonc
{
  "mcpServers": {
    "vidnavigator": {
      "type": "http",
      "url": "https://api.vidnavigator.com/mcp/",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      }
    }
  }
}
```

*Replace with your actual API key*

![Cursor Demo](./cursor/cursor-screenshot.png)

3. 🎤 Start chatting!
4. (Optional) Use the [preconfigured agent](./cursor/vidnavigator.agent) for an enhanced experience

**📁 [→ Complete Cursor Setup Guide](./cursor/)**

### For Claude Desktop Users

**⚡ One-Click Installation**

1. 📥 **[Download Latest Extension (.dxt)](https://github.com/vidnavigator/vidnavigator-mcp-starter/releases/latest)**
2. 🗝 [Get your free API key](https://vidnavigator.com) → User → Dev-tools
3. Open Claude Desktop → Settings → Extensions → Install Extensions

![Cursor Demo](./claude-desktop/claude-screenshot-extensions.png)

4. Select the downloaded `.dxt` file

![Cursor Demo](./claude-desktop/claude-screenshot-install.png)

5. Configure your API key in the extension settings and enable it

![Cursor Demo](./claude-desktop/claude-screenshot-enable.png)

6. 🎤 Start chatting!

**📁 [→ Complete Claude Desktop Setup Guide](./claude-desktop/)**

## 💬 Example Queries

- *"Find a video where Neil deGrasse Tyson explains gravity"*
- *"Summarize this YouTube video: https://youtube.com/watch?v=xyz"*
- *"What did the speaker say about climate policy?"*
- *"Give me the transcript for this TikTok: [link]"*
- *"Transcribe this Instagram reel and give me the three key points: [link]"*
- *"From this product review, extract the product, the price and the verdict: [link]"*
- *"Find the most liked TikToks about AI tools this week"*
- *"How many VidNavigator credits do I have left?"*

## 🔧 Available Tools

The tools are served by the hosted VidNavigator MCP server, so Cursor and the Claude Desktop extension always get the same, current list. Full descriptions: [docs.vidnavigator.com/mcp-server](https://docs.vidnavigator.com/mcp-server).

- **Online videos**: `search_videos`, `get_video_transcript`, `transcribe_video`, `analyze_video`, `answer_followup_question`, `extract_video_data`, `get_tweet_statement`
- **TikTok**: `search_tiktok`, `scrape_tiktok_profile`
- **Your files**: `list_files`, `get_file`, `analyze_file`, `search_files`, `extract_file_data`, `list_namespaces`
- **Tasks and account**: `get_task_status`, `get_usage`

## 📊 Credits

Every tool draws from your plan's shared [credit pool](https://vidnavigator.com/pricing), like the equivalent API endpoint. Polling a background job is free. Use the `get_usage` tool to check your balance.

## 🆘 Support

- **Website**: [https://vidnavigator.com](https://vidnavigator.com)
- **Documentation**: [https://docs.vidnavigator.com](https://docs.vidnavigator.com)
- **Issues**: [GitHub Issues](https://github.com/vidnavigator/vidnavigator-mcp-starter/issues)
- **Email**: support@vidnavigator.com

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

Made with ❤️ by the [VidNavigator](https://vidnavigator.com) team