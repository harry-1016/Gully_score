# GULLY SCORE - Cricket Scoring PWA

A Progressive Web App for live cricket scoring with real-time Firebase sync.

## Features

- 🏏 Live cricket scoring
- 📊 Real-time score updates
- 🔄 Firebase database integration
- 📱 Progressive Web App (installable on mobile)
- ⚡ Offline support with Service Worker
- 🎨 Beautiful, responsive UI

## Files Included

- `index.html` - Landing page (redirects to public.html)
- `public.html` - Public score viewing page
- `admin.html` - Admin scoring panel
- `manifest.json` - PWA manifest
- `sw.js` - Service Worker for offline functionality
- `icon-192.png` - App icon (192x192)
- `icon-512.png` - App icon (512x512)

## Firebase Setup

**⚠️ CRITICAL STEP - The app will NOT work without Firebase setup!**

See the complete step-by-step guide in **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)**

### Quick Setup:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Realtime Database (Start in test mode)
4. Go to Project Settings > General > Your apps
5. Click Web icon `</>` and register your app
6. Copy the `firebaseConfig` object
7. Replace the config in **BOTH** `public.html` and `admin.html`:

```javascript
// Replace this in BOTH files:
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",           // ← Replace these
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Database Rules (for testing):

In Firebase Console > Realtime Database > Rules:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**Important Notes:**
- Both `public.html` and `admin.html` must have the **SAME** Firebase config
- Without Firebase, matches won't sync between admin and public view
- Open browser console (F12) to verify: should see "Firebase initialized successfully"

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Clone your repository locally
3. Copy all files to your repository folder
4. Commit and push:

```bash
git add .
git commit -m "Initial commit - GULLY SCORE PWA"
git push origin main
```

5. Go to your repository Settings > Pages
6. Select "Deploy from a branch"
7. Select "main" branch and "/ (root)" folder
8. Click Save

Your app will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Usage

### Admin Panel (`admin.html`)
1. Enter match settings (overs)
2. Add team names and player names
3. Proceed to toss
4. Select toss winner and decision
5. Start match and begin scoring
6. Use scoring buttons to record runs, wickets, extras
7. View live scorecard
8. End innings/match when complete

### Public View (`public.html`)
- Automatically shows all live matches
- Click any match to view detailed scorecard
- Updates in real-time via Firebase
- Shows live badge for ongoing matches
- Displays recent completed matches

## PWA Installation

### On Mobile (Android/iOS):
1. Open the app in your browser
2. Look for "Add to Home Screen" option
3. The app will install and work offline

### On Desktop (Chrome/Edge):
1. Look for install icon in address bar
2. Click to install
3. App opens in standalone window

## Customization

### Change Colors
Edit the CSS gradient values in both HTML files:
- Primary gradient: `#ff6b35` to `#f7931e`
- Background: `#1e3c72` to `#2a5298`

### Change App Name
1. Update `manifest.json` - change `name` and `short_name`
2. Update HTML titles
3. Update the header text in both files

### Add More Features
- Modify scoring buttons
- Add player statistics
- Implement match history
- Add commentary/notes
- Export scorecard as PDF/image

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Free to use and modify.

## Credits

Created with ❤️ by Harry

---

## Troubleshooting

**Firebase not connecting:**
- Check your Firebase config is correct
- Ensure Realtime Database is enabled
- Check database rules allow read/write

**PWA not installing:**
- Ensure you're using HTTPS (GitHub Pages provides this)
- Check manifest.json is accessible
- Verify service worker is registered

**Scores not syncing:**
- Check internet connection
- Verify Firebase config
- Check browser console for errors

For issues, check browser developer console (F12) for error messages.
