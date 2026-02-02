#!/bin/bash

# ASTRA - GitHub Secrets Setup Script
# Just paste your credentials below and run this script

# ============================================
# PASTE YOUR CREDENTIALS HERE:
# ============================================

EXPO_TOKEN="paste_your_expo_token_here"
GEMINI_API_KEY="paste_your_gemini_api_key_here"
CONVEX_URL="https://industrious-guineapig-373.convex.cloud"

# ============================================
# DO NOT EDIT BELOW THIS LINE
# ============================================

REPO="nbharath1306/Astra-Circle13"

echo "🚀 Setting up GitHub Secrets for ASTRA..."

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Install it with: brew install gh"
    echo ""
    echo "Or manually add secrets at:"
    echo "https://github.com/$REPO/settings/secrets/actions"
    echo ""
    echo "Add these secrets:"
    echo "  EXPO_TOKEN = $EXPO_TOKEN"
    echo "  GEMINI_API_KEY = $GEMINI_API_KEY"
    echo "  CONVEX_URL = $CONVEX_URL"
    exit 1
fi

# Login to GitHub if needed
echo "Checking GitHub authentication..."
if ! gh auth status &> /dev/null; then
    echo "Please login to GitHub:"
    gh auth login
fi

# Add secrets
echo "Adding EXPO_TOKEN..."
echo "$EXPO_TOKEN" | gh secret set EXPO_TOKEN --repo "$REPO"

echo "Adding GEMINI_API_KEY..."
echo "$GEMINI_API_KEY" | gh secret set GEMINI_API_KEY --repo "$REPO"

echo "Adding CONVEX_URL..."
echo "$CONVEX_URL" | gh secret set CONVEX_URL --repo "$REPO"

echo ""
echo "✅ All secrets added successfully!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub to trigger build: git push origin main"
echo "2. Or manually trigger at: https://github.com/$REPO/actions"
echo "3. Download APK from: https://expo.dev"
echo ""
echo "🎉 ASTRA is ready to build!"
