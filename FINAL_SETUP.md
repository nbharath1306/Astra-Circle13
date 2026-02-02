# 🎯 ASTRA - Final Setup Steps

## Current Status
✅ Convex deployed to production: `https://industrious-guineapig-373.convex.cloud`
✅ GitHub Actions configured
✅ All code pushed to GitHub
❌ **Need valid Expo token to build APK**

---

## 🚀 Two Options to Get Your APK:

### Option 1: Fix GitHub Actions (Recommended)

**Step 1:** Create Expo account
- Go to https://expo.dev/signup
- Sign up and verify email

**Step 2:** Get access token
- Login → Settings → Access Tokens
- Create new token named "GitHub Actions"
- Copy the token (starts with `ey...`)

**Step 3:** Update GitHub secret
- Go to: https://github.com/nbharath1306/Astra-Circle13/settings/secrets/actions
- Click EXPO_TOKEN → Update secret
- Paste your new token

**Step 4:** Trigger build
```bash
git commit --allow-empty -m "Retry build"
git push origin main
```

Download APK from https://expo.dev after 10-15 minutes.

---

### Option 2: Build Locally (Faster!)

**Step 1:** Login to Expo
```bash
cd /Users/nbharath/.gemini/antigravity/scratch/Astra
npx expo login
```
Enter your Expo email and password

**Step 2:** Build APK locally
```bash
npx eas build --platform android --profile production --local
```

The APK will be saved in your current directory after 10-15 minutes!

---

## 📱 After You Get the APK

1. Transfer APK to your Android phone
2. Enable "Install from unknown sources" in Settings
3. Install ASTRA
4. Open the app
5. Go to HUD tab → Capture Food
6. Test the 4-agent swarm!

---

## 🔍 Verify Everything Works

Test Expo login:
```bash
npx expo whoami
```

Should show your username if logged in correctly.

---

## 💡 Recommendation

**Use Option 2 (Build Locally)** - it's faster and you'll have the APK in 15 minutes instead of dealing with GitHub Actions setup.

Just run:
```bash
npx expo login
npx eas build --platform android --profile production --local
```

Done! 🚀
