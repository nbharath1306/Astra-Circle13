# 🚀 Build ASTRA APK Locally (Recommended)

GitHub Actions is having issues with EAS configuration. **Building locally is MUCH faster and more reliable.**

## Quick Build (15 minutes)

### Step 1: Login to Expo
```bash
cd /Users/nbharath/.gemini/antigravity/scratch/Astra
npx expo login
```
Enter your Expo email and password.

### Step 2: Build APK
```bash
npx eas build --platform android --profile production --local
```

That's it! The APK will be saved in your current directory after ~15 minutes.

---

## Install on Your Phone

1. Find the APK file (will be named something like `build-*.apk`)
2. Transfer to your Android phone (AirDrop, USB, email, etc.)
3. On your phone: Settings → Security → Enable "Install from unknown sources"
4. Open the APK file and install
5. Launch ASTRA!

---

## Test the App

1. Open ASTRA
2. Go to **HUD** tab
3. Tap **"CAPTURE FOOD"**
4. Take a photo of any food
5. Watch the 4-agent council deliberate
6. Receive your verdict!

---

## Why Local Build is Better

✅ **Faster**: No waiting for GitHub Actions queue
✅ **More reliable**: No configuration issues
✅ **Immediate**: APK in your folder right away
✅ **Easier to debug**: See errors in real-time

---

## If You Still Want GitHub Actions

The build is still running, but it may fail again. If you really want automated builds, you'll need to:

1. Create a proper EAS project on expo.dev
2. Link it to your GitHub repo
3. Get the correct project ID

But honestly, for testing and development, **local builds are the way to go**! 🚀
