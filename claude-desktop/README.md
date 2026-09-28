# 🎥 VidNavigator for Claude Desktop

AI-powered video search, transcription, analysis and data extraction for [Claude Desktop](https://claude.ai/desktop).

The extension is a small relay: Claude Desktop talks to it locally, and it forwards every request to the hosted VidNavigator MCP server (`https://api.vidnavigator.com/mcp/`) with your API key. You get exactly the tools the hosted server offers, and new tools appear without reinstalling the extension.

## 🚀 Features

- **🔍 AI Video Search**: AI-ranked YouTube search with year, duration and purpose filters
- **📝 Transcripts and Transcription**: Transcripts from YouTube, TikTok, X, Facebook, Vimeo and more, and speech-to-text for videos without captions (Instagram included), of any length
- **📽️ Video Analysis**: Summaries and Q&A on any video, with follow-up questions
- **🧩 Data Extraction**: Structured data extracted from a video into the fields you define
- **🐦 Tweet Claim Analysis**: The core claim of an X/Twitter post, ready to fact-check
- **🎵 TikTok**: Keyword search with sort, date and popularity filters, and profile scrapes
- **📁 Your Files**: Search, analyze and extract data from the files you uploaded to VidNavigator
- **📊 Usage Tracking**: Your credit balance and activity

## ⚡ Quick Installation

### Option 1: Download Pre-built Extension (Recommended)
1. **📥 [Download Latest Extension (.dxt)](https://github.com/vidnavigator/vidnavigator-mcp-starter/releases/latest)**
2. Open **Claude Desktop**
3. Go to **Settings** → **Extensions**
4. Click **"Install from file"** and select the downloaded `.dxt` file

### Option 2: Build from Source
```bash
git clone https://github.com/vidnavigator/vidnavigator-mcp-starter.git
cd vidnavigator-mcp-starter/claude-desktop
npm install
npm run build
```
Install the generated `dist/vidnavigator.dxt` file in Claude Desktop.

## Configuration

After installation, you'll need to configure your VidNavigator API key:

1. **Get an API Key**:
   - Sign up at [https://vidnavigator.com](https://vidnavigator.com)
   - Go to your profile and create an API key
   - Copy the API key (starts with `vna_`)

2. **Configure the Extension**:
   - Open Claude Desktop Settings > Extensions
   - Find "VidNavigator" and click "Configure"
   - Enter your API key in the "VidNavigator API Key" field
   - Click "Save"

## Usage

Once installed and configured, you can use VidNavigator tools in your Claude conversations:

### Search for Videos
```
Search for videos about "React best practices 2024"
```

### Analyze a Video
```
Analyze this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Get Video Transcript
```
Get the transcript for: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Transcribe Non-YouTube Videos
```
Transcribe this Instagram video: https://www.instagram.com/reel/C86ZvEaqRmo/
```

### Ask Follow-up Questions
```
What are the main points discussed in this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Check Usage
```
Show my current API usage and limits
```

### Search TikTok
```
Find the most liked TikToks about AI tools this week
```

### Extract Data
```
From this product review, extract the product, the price and the verdict: https://www.youtube.com/watch?v=...
```

## Available Tools

The tool list comes from the hosted server. Full descriptions: [docs.vidnavigator.com/mcp-server](https://docs.vidnavigator.com/mcp-server).

- **Online videos**: `search_videos`, `get_video_transcript`, `transcribe_video`, `analyze_video`, `answer_followup_question`, `extract_video_data`, `get_tweet_statement`
- **TikTok**: `search_tiktok`, `scrape_tiktok_profile`
- **Your files**: `list_files`, `get_file`, `analyze_file`, `search_files`, `extract_file_data`, `list_namespaces`
- **Tasks and account**: `get_task_status`, `get_usage`

Transcription, extraction, tweet analysis and the TikTok tools run as background jobs. Claude gets a `task_id` and calls `get_task_status` every 3 seconds until the result is ready, so no video is too long.

## Credits

Every tool draws from your plan's shared [credit pool](https://vidnavigator.com/pricing), like the equivalent API endpoint. Polling a background job is free. Use the `get_usage` tool to check your balance.

## Troubleshooting

### Extension Won't Install
- Ensure you're running the latest version of Claude Desktop
- Check that you have sufficient disk space
- Try restarting Claude Desktop

### Tools Not Available
- Verify your API key is configured correctly
- Check your internet connection
- Ensure your subscription is active

### API Errors
- Verify your API key starts with `vna_`
- Check if you've exceeded your usage limits
- Try again in a few moments if you see rate limit errors

## Support

- **Website**: [https://vidnavigator.com](https://vidnavigator.com)
- **Documentation**: [https://docs.vidnavigator.com](https://docs.vidnavigator.com)
- **Issues**: [GitHub Issues](https://github.com/vidnavigator/vidnavigator-mcp-starter/issues)
- **Email**: support@vidnavigator.com

## Privacy & Security

- Your API key is stored securely in your system's keychain
- All video analysis is performed server-side
- No video content is stored permanently
- All communications are encrypted in transit

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.

---

[← Back to Main Project](../README.md) | Made with ❤️ by the [VidNavigator](https://vidnavigator.com) team