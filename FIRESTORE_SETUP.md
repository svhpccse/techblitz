# Firestore Security Rules Setup

## Problem
The admin panel is showing: `FirebaseError: Missing or insufficient permissions` when trying to fetch registrations.

## Solution
You need to update your Firestore security rules in the Firebase Console.

## Steps to Fix

### Option 1: Using Firebase CLI (Recommended)

1. Install Firebase CLI if you haven't already:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Deploy the rules from the `firestore.rules` file:
```bash
firebase deploy --only firestore:rules
```

### Option 2: Manual Update in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** → **Rules** tab
4. Replace the entire rules content with the content from `firestore.rules` file
5. Click **Publish**

## What the Rules Do

The rules allow:
- ✅ **Anyone** to READ from all registration collections (admin can view registrations)
- ✅ **Authenticated users** to WRITE/CREATE registrations (for form submissions)
- ✅ **Default DENY** for all other access (secure by default)

## Collections Covered

1. `registrations_auto_mech` - Auto/Mech registrations
2. `registrations_cse_aiml` - CSE/AIML registrations
3. `registrations_eee_ece` - EEE/ECE registrations
4. `registrations_civil` - Civil registrations
5. `registrations_mlt` - MLT registrations
6. `registrations_non_technical` - Non-technical event registrations

## After Applying Rules

- Admin panel will be able to fetch and display all registrations
- Users can submit registration forms
- All data is still secure with proper authentication for writes
