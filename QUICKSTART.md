# Quick Start Guide

## 🚀 Getting Started with ASTRA

### Prerequisites
- Node.js installed
- Expo Go app on your phone (for testing)
- Google Gemini API key

### Setup (5 minutes)

1. **Get your Gemini API Key**
   - Visit: https://aistudio.google.com/app/apikey
   - Create a new API key
   - Copy it

2. **Add API key to environment**
   ```bash
   cd /Users/nbharath/.gemini/antigravity/scratch/Astra
   
   # Edit .env file and add your key:
   # EXPO_PUBLIC_GEMINI_API_KEY=your_actual_key_here
   ```

3. **Start the backend**
   ```bash
   npx convex dev
   ```
   Keep this terminal open - it needs to stay running!

4. **Start the app** (in a new terminal)
   ```bash
   npx expo start
   ```

5. **Open on your phone**
   - Scan the QR code with Expo Go app
   - Or press 'a' for Android emulator

### First Test

1. Open the app → Go to **HUD** tab
2. Tap **"CAPTURE FOOD"**
3. Take a photo of any food
4. Wait for the council to deliberate
5. Receive your verdict!

---

## ⚠️ Troubleshooting

**"Gemini API key not configured"**
- Make sure you added the key to `.env` file
- Restart the Expo server after adding the key

**TypeScript errors**
- Normal! Convex generates types when running
- Make sure `npx convex dev` is running

**Camera not working**
- Grant camera permissions when prompted
- Check app.json has camera permissions configured

---

## 📱 What to Expect

- **Agent Alpha** will analyze your food photo
- **Agent Beta** will check your patterns (empty at first)
- **Agent Gamma** will predict consequences
- **Agent Delta** will give you a cold, direct verdict

Example verdicts:
- ✅ "Optimal protein ratio detected. Proceed."
- ✗ "Hidden oils detected. Insulin spike 300%. REJECTED."
- ✗ "Pattern: stress eating. This solves nothing. REJECTED."

---

## 🎯 Next Steps

After testing:
1. Check **Mission Log** to see your command history
2. View **Analytics** for performance breakdown
3. Try different foods to see agent responses
4. Watch your compliance score change

Enjoy your autonomous biological governance system! 🚀
