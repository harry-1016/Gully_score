# Firebase Setup Guide for GULLY SCORE

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or "Create a project"
3. Enter project name: `gully-score` (or any name you like)
4. Click Continue
5. Disable Google Analytics (optional) or configure it
6. Click "Create project"
7. Wait for project creation, then click "Continue"

## Step 2: Enable Realtime Database

1. In Firebase Console, click on "Realtime Database" in the left menu
2. Click "Create Database"
3. Choose a location (select closest to your users)
4. **Start in test mode** (for development) - we'll secure it later
5. Click "Enable"

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click the **Web icon** `</>` to add a web app
5. Enter app nickname: "GULLY SCORE Web App"
6. **Check** "Also set up Firebase Hosting" (optional)
7. Click "Register app"
8. You'll see your Firebase configuration code. **Copy this!**

It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

## Step 4: Update Your HTML Files

### In `admin.html`:

Find this section (around line 250):

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

**Replace the entire object** with your Firebase config from Step 3.

### In `public.html`:

Find the same section and **replace with the SAME configuration**.

⚠️ **IMPORTANT**: Both files must have the EXACT same Firebase configuration!

## Step 5: Set Database Rules (Security)

### For Development/Testing:
1. Go to Realtime Database in Firebase Console
2. Click "Rules" tab
3. Use these rules (allows anyone to read/write):

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

4. Click "Publish"

### For Production (More Secure):

```json
{
  "rules": {
    "matches": {
      ".read": true,
      "$matchId": {
        ".write": "!data.exists() || data.child('lastUpdated').val() < (now - 300000)",
        ".validate": "newData.hasChildren(['teamA', 'teamB', 'overs', 'matchStatus'])"
      }
    }
  }
}
```

This allows:
- Anyone to read matches (public view)
- New matches to be created
- Matches to be updated only within 5 minutes of last update

## Step 6: Test Your Setup

1. Open `admin.html` in your browser
2. Open browser console (F12)
3. You should see: "Firebase initialized successfully"
4. Start a new match
5. Open `public.html` in another tab/browser
6. You should see the match appear automatically!

## Troubleshooting

### "Firebase initialization error"
- Check that you replaced ALL placeholder values in firebaseConfig
- Make sure you copied the ENTIRE config object
- Verify your Firebase project exists

### "Permission denied" errors
- Go to Database Rules and ensure they're set correctly
- For testing, use the open rules from Step 5

### Matches not appearing in public view
- Confirm both files have the SAME Firebase config
- Check browser console for errors
- Verify database rules allow reads
- Make sure you clicked "Start Match" in admin panel

### Firebase functions not working
- Ensure you have internet connection
- Check that Firebase CDN scripts are loading (look in Network tab)
- Verify your project has Realtime Database enabled

## Verification Checklist

- [ ] Firebase project created
- [ ] Realtime Database enabled
- [ ] Firebase config copied from console
- [ ] Config pasted in BOTH admin.html AND public.html
- [ ] Database rules set and published
- [ ] Browser console shows "Firebase initialized successfully"
- [ ] Test match created and visible in public view

## Database Structure

Your data will be stored like this:

```
gully-score/
└── matches/
    ├── match_1234567890/
    │   ├── teamA: {...}
    │   ├── teamB: {...}
    │   ├── score: 45
    │   ├── wickets: 2
    │   ├── matchStatus: "live"
    │   └── lastUpdated: 1234567890
    └── match_9876543210/
        └── ...
```

## Need Help?

1. Check browser console (F12) for error messages
2. Verify Firebase config is correct
3. Test with simple open database rules first
4. Make sure both HTML files use same config

---

Once Firebase is configured, your app will:
✅ Save matches in real-time
✅ Update public view automatically
✅ Work across multiple devices
✅ Persist data even after page refresh
