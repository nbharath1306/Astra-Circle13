# ASTRA - Rebuilt

This repository has been reset and rebuilt from scratch.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` file with your Gemini API Key:
    ```
    EXPO_PUBLIC_GEMINI_API_KEY=your_key_here
    ```

3.  **Start Backend**:
    ```bash
    npx convex dev
    ```

4.  **Start Application**:
    ```bash
    npx expo start
    ```

## Architecture

-   **Backend**: Convex (Agents in `convex/agents/`)
-   **Frontend**: Expo Router (`app/(tabs)/`)
