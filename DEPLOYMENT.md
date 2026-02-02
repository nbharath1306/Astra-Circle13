# ASTRA - Simple Deployment Guide

## 🎯 Two Options for You

### Option 1: Quick Test Build (Recommended First)
Use your local Convex for now, just to test the GitHub Actions build:

1. **Add GitHub Secrets** at: https://github.com/nbharath1306/Astra-Circle13/settings/secrets/actions
   - `EXPO_TOKEN`: Get from https://expo.dev (you need to create an Expo account first)
   - `GEMINI_API_KEY`: Your Gemini API key (you already have this)
   - `CONVEX_URL`: Use `http://127.0.0.1:3210` for now

2. **Push to GitHub**:
   ```bash
   git add -A
   git commit -m "Add GitHub Actions build"
   git push origin main
   ```

3. **Download APK** from https://expo.dev after build completes

---

### Option 2: Full Production (Do This Later)

When you're ready for production Convex:

1. **Login to Convex** (you do this manually):
   ```bash
   npx convex login
   ```
   - Open the browser link it gives you
   - Login with GitHub/Google
   
2. **Deploy to Production**:
   ```bash
   npx convex deploy
   ```
   - Copy the production URL it gives you (like `https://happy-animal-123.convex.cloud`)

3. **Update GitHub Secret**:
   - Change `CONVEX_URL` to your production URL

---

## 📝 What You Need Right Now

**Just get the Expo token:**
1. Go to https://expo.dev
2. Sign up/login
3. Go to Settings → Access Tokens
4. Create a new token
5. Add it as `EXPO_TOKEN` in GitHub secrets

That's it! The build will work with your local Convex URL for testing.

---

## ⚡ Quick Commands

```bash
# Get Expo account
npx expo register

# Or login if you have one
npx expo login

# Then get your username
npx expo whoami
```

Then visit: `https://expo.dev/accounts/[your-username]/settings/access-tokens`
