HIzen Multi-page Website
========================

Files:
- index.html      Home
- about.html      About
- features.html   Features
- chat.html       Ask HIzen (demo chat UI)
- settings.html   Theme/language settings
- css/style.css   Shared styling
- js/script.js    Shared interactions

Run locally:
1. Extract this folder.
2. Open the folder in VS Code.
3. Use Live Server, or deploy the folder to Vercel as a static site.

Features:
- Real separate HTML pages (not in-page scrolling navigation)
- Responsive desktop/mobile layout
- Mobile hamburger menu
- Dark/Light theme saved in localStorage
- Thai/English language saved in localStorage
- Real-time local clock/date on Home
- Chat demo UI

AI:
The chat page is intentionally a demo. It does not call an AI provider yet.
To enable real AI, create a server-side API route (for example /api/chat) and
store the provider API key in server-side environment variables. Never put
secret API keys in browser JavaScript.
