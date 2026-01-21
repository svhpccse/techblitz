# Event Rules Management System - Implementation Guide

## Overview
This system allows you to manage all event rules through Firestore and the Admin Panel, instead of hardcoding them in the application.

## New Files Created

### 1. **src/firestoreRulesUtils.ts**
Firestore utility functions for managing event rules:
- `getAllEventRulesFromFirestore()` - Fetch all rules from Firestore
- `getEventRuleFromFirestore(eventName)` - Fetch specific rule
- `saveEventRuleToFirestore(rule)` - Save new rule
- `updateEventRuleInFirestore(eventName, updates)` - Update existing rule
- `deleteEventRuleFromFirestore(eventName)` - Delete rule
- `pushHardcodedRulesToFirestore(hardcodedRules)` - One-time migration of all hardcoded rules

### 2. **src/components/AdminRulesMigration.tsx**
Component for pushing hardcoded rules to Firestore (one-time operation):
- Shows number of events to migrate
- Provides "Push All Rules to Firestore" button
- Displays migration status and any errors
- Can be deleted after first successful migration

### 3. **src/components/AdminRulesEditor.tsx**
Full-featured rules editor with:
- Search functionality to find rules
- Edit existing rules inline
- Delete rules
- Add new rules
- Real-time updates to Firestore
- Responsive design

### 4. **src/components/EventRulesModal.tsx** (Updated)
Modal now fetches rules from Firestore instead of hardcoded data:
- Loading state while fetching
- Fallback message if rules don't exist
- Error handling

## How to Use

### Step 1: Push Hardcoded Rules to Firestore (First Time Only)
1. Login to Admin Panel
2. Go to **"Migrate Rules"** tab
3. Click **"Push All Rules to Firestore"** button
4. Wait for migration to complete
5. You should see "Successfully pushed X event rules to Firestore"

### Step 2: Verify Rules in Firestore
1. Go to Firebase Console
2. Check `event_rules` collection
3. You should see all events with their rules

### Step 3: Edit Rules from Admin Panel
1. Go to **"Edit Rules"** tab in Admin Panel
2. Search for an event
3. Click **Edit** button on any rule card
4. Modify rules and click **Save Changes**
5. Changes are immediately saved to Firestore

### Step 4: Add New Rules
1. In **"Edit Rules"** tab, click **"Add Rule"** button
2. Fill in event name, title, and rules
3. Click **Save Changes**

### Step 5: Delete Old Files (After Migration)
Once migration is complete, you can:
1. Delete the `AdminRulesMigration` component and button (it's only needed once)
2. Remove EVENT_RULES from `src/data.ts`
3. Remove EVENT_RULES from `src/components/Events.tsx`
4. This reduces bundle size and centralizes all rules management

## Firestore Collection Structure

```
event_rules/
├── cad_master
│   ├── id: "cad_master"
│   ├── eventName: "CAD MASTER"
│   ├── title: "CAD MASTER"
│   ├── rules: ["Rule 1", "Rule 2", ...]
│   └── lastUpdated: timestamp
├── code_combat
│   ├── id: "code_combat"
│   ├── eventName: "CODE COMBAT"
│   ├── title: "CODE COMBAT Rules"
│   ├── rules: ["Teams can have up to 2 members.", ...]
│   └── lastUpdated: timestamp
... (more events)
```

## Admin Panel Tabs

### 1. Registrations Tab
- View all registrations
- Search and filter
- Export to Excel
- View payment proofs

### 2. Edit Rules Tab
- Search for event rules
- Edit existing rules
- Add new rules
- Delete rules
- Real-time Firestore sync

### 3. Migrate Rules Tab
- One-time migration button
- Shows migration status
- Displays success/error messages

## Key Features

✅ **Centralized Management** - All rules in one place (Firestore)
✅ **Real-time Updates** - Changes reflect immediately
✅ **Easy Editing** - Intuitive UI in Admin Panel
✅ **One-Time Migration** - Simple process to move from hardcoded to database
✅ **Search & Filter** - Easily find rules
✅ **Add/Edit/Delete** - Full CRUD operations
✅ **Error Handling** - Graceful fallbacks if rules missing
✅ **Responsive Design** - Works on all devices

## Security Notes

- Admin Panel requires password authentication
- Only authenticated admins can edit rules
- Rules are stored in Firestore with proper access rules
- Recommend setting Firestore rules to only allow authenticated users to write

## Recommended Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /event_rules/{document=**} {
      allow read: if true; // Anyone can read rules
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

## Next Steps

1. **Push Migration Button** - Click in Admin Panel to migrate all rules
2. **Test Editing** - Edit a rule to verify it works
3. **Test Reading** - Refresh the app and check if rules load from Firestore
4. **Delete Hardcoded Data** - Once confirmed working, remove EVENT_RULES from files
5. **Monitor** - Check Firestore console for any issues

## Troubleshooting

**Rules not showing:**
- Check if migration was completed successfully
- Verify Firestore collection exists and has data
- Check browser console for errors

**Can't save rules:**
- Check if you're logged in as admin
- Verify Firestore rules allow writes
- Check network tab for failed requests

**Migration fails:**
- Check Firestore is accessible
- Verify Firebase config is correct
- Check console for detailed error messages

---

**Status:** Ready for implementation
**Created:** 2026-01-14
**Version:** 1.0
