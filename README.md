# ASTRA - Autonomous Biological Governance System

An enterprise-grade biological defense system powered by a swarm of 4 AI agents.

## 🎯 Overview

ASTRA replaces "human will" with "algorithmic certainty" through a Council of 4 Agents:

- **Agent Alpha (The Auditor)**: Visual analysis using Gemini 2.0 Flash Vision
- **Agent Beta (The Strategist)**: Pattern analysis using Gemini 2.0 Pro
- **Agent Gamma (The Oracle)**: Predictive modeling using Gemini 1.5 Pro
- **Agent Delta (The Executioner)**: Command synthesis using Gemini 2.0 Flash

## 🚀 Tech Stack

- **Frontend**: React Native (Expo SDK 52) + TypeScript
- **State**: Legend-State
- **Graphics**: React Native Skia
- **Backend**: Convex
- **AI**: Google Gemini 2.0 (Multiple models)

## 📦 Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
Create a `.env` file with:
```
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
EXPO_PUBLIC_CONVEX_URL=your_convex_url
```

Get your Gemini API key from: https://aistudio.google.com/app/apikey

3. **Start Convex backend**:
```bash
npx convex dev
```

4. **Start Expo**:
```bash
npx expo start
```

## 🏗️ Architecture

### Backend (Convex)
- `convex/schema.ts` - Database schema
- `convex/swarmRouter.ts` - Agent orchestration
- `convex/agents/` - 4 AI agents
- `convex/mutations/` - Database mutations
- `convex/queries/` - Data queries

### Frontend (React Native)
- `app/(tabs)/hud.tsx` - Bio-Metric HUD
- `app/(tabs)/mission-log.tsx` - Command history
- `app/(tabs)/analytics.tsx` - Performance analysis
- `components/ComplianceRing.tsx` - Skia-powered ring
- `components/FoodAnalyzer.tsx` - Camera integration

## 🎮 Features

- **Food Analysis**: Camera-based meal analysis through agent swarm
- **Compliance Tracking**: Real-time compliance scoring
- **Mission Log**: Chronological command history
- **Shame Protocol**: Automated enforcement for low compliance
- **Voice Interrogation**: Voice-based interaction (coming soon)

## 📱 Usage

1. Open the app and navigate to the HUD tab
2. Tap "CAPTURE FOOD" to analyze a meal
3. The agent council will deliberate and provide a verdict
4. View your compliance score and mission log

## ⚠️ Important Notes

- The Shame Protocol is implemented as a **simulated** feature
- Requires camera permissions for food analysis
- Convex backend must be running for full functionality

## 🔒 License

Private project - All rights reserved
