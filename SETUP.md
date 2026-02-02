# Quick Setup Guide

## 📋 One-Time Setup (Copy-Paste)

1. **Get your credentials:**
   - **Expo Token**: Go to https://expo.dev → Settings → Access Tokens → Create new token
   - **Gemini API Key**: You already have this in your `.env` file
   - **Convex URL**: Already set to `https://industrious-guineapig-373.convex.cloud`

2. **Open the setup script:**
   ```bash
   open setup-secrets.sh
   ```

3. **Paste your credentials** in the script where it says:
   ```bash
   EXPO_TOKEN="paste_your_expo_token_here"
   GEMINI_API_KEY="paste_your_gemini_api_key_here"
   ```

4. **Run the script:**
   ```bash
   ./setup-secrets.sh
   ```

That's it! The script will automatically add all secrets to GitHub.

---

## 🚀 Build Your APK

After running the script:

```bash
git push origin main
```

Or trigger manually at: https://github.com/nbharath1306/Astra-Circle13/actions

Download your APK from https://expo.dev after 10-15 minutes!

---

## 🔧 Manual Setup (if script doesn't work)

Go to: https://github.com/nbharath1306/Astra-Circle13/settings/secrets/actions

Add these 3 secrets:
- `EXPO_TOKEN` = your Expo token
- `GEMINI_API_KEY` = your Gemini key
- `CONVEX_URL` = `https://industrious-guineapig-373.convex.cloud`
