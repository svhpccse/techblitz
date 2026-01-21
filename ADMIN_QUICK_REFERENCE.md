# Admin Panel - Quick Reference

## 🚀 Quick Start (60 seconds)

1. **Go to admin panel:**
   ```
   http://localhost:5173/admin
   ```

2. **Login:**
   ```
   Password: tech@blitz2k26
   ```

3. **You're in!** Now you can:
   - View all registrations in the table
   - Search and filter data
   - View payment proofs
   - Export to Excel

---

## 📋 Main Features at a Glance

| Feature | How to Use | Keyboard |
|---------|-----------|----------|
| **Search** | Type in search box | N/A |
| **Filter by Dept** | Select from dropdown | N/A |
| **Filter by Type** | Select from dropdown | N/A |
| **View Payment** | Click eye icon (👁️) | N/A |
| **Export Excel** | Click export button | N/A |
| **View Stats** | Scroll to bottom | N/A |

---

## 🔍 Search Tips

**Search finds:**
- Student name
- Email address
- Phone number
- Event name

**Example searches:**
```
John              → finds "John Doe"
john@gmail.com    → finds email
9876543210        → finds phone
robotics          → finds "Robotics Challenge"
```

---

## 📊 Understanding Statistics

```
Total Registrations   = All registrations across all events
Active Departments    = Number of depts with registrations
Total Fee Collected   = Total Registrations × ₹150

Example:
- 150 total registrations
- 5 active departments
- Total fee = 150 × ₹150 = ₹22,500
```

---

## 📥 Export to Excel

**What gets exported:**
- All registration data
- All columns from table
- Formatted with dates
- Optimized column widths

**File name format:**
```
TECH_BLITZ_2K26_Registrations_2026-01-07.xlsx
```

**Excel columns:**
1. ID
2. Name
3. Email
4. Phone
5. College
6. Department
7. Year
8. Event Type
9. Event Name
10. Payment Screenshot URL
11. Registered Date

---

## 🔐 Password Management

**Default password:**
```
tech@blitz2k26
```

**To change password:**

File: `src/components/AdminAuth.tsx`

Line 21:
```typescript
const ADMIN_PASSWORD = 'your-new-password';
```

Save → Dev server auto-reloads

---

## 🖼️ Viewing Payment Proofs

1. **Find the registration** in the table
2. **Locate Payment Proof column** (right side)
3. **Click the eye icon** (👁️)
4. **Image opens in popup**
5. **Click outside to close**

---

## 💡 Tips & Tricks

### Speed up search
- Use partial names: "john" instead of "john doe smith"
- Filter by department first, then search
- Use email for exact matches

### Find specific registrations
- Filter by department → reduces results
- Filter by event type → narrows down
- Then search for specific person

### Excel analysis
- Filter in Excel for advanced sorting
- Create pivot tables
- Generate custom reports
- Track payment verification

---

## ⚠️ Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Can't login | Check password (case-sensitive) |
| No registrations showing | Wait for first registration to complete |
| Excel download doesn't work | Try different browser |
| Payment image won't load | Check internet connection |
| Page looks broken | Clear browser cache & refresh |

---

## 📱 Mobile Access

- ✅ Admin panel works on mobile/tablet
- ✅ Table scrolls horizontally on small screens
- ✅ Filters stack on mobile
- ✅ Export works on all devices

**Mobile optimization:**
- Filters on top
- Table in scrollable container
- Touch-friendly buttons
- Responsive text size

---

## 🎯 Daily Workflow

### Morning Check
```
1. Open admin panel
2. Check total registrations count
3. Review overnight registrations
4. Check for any payment proof issues
```

### During Event
```
1. Monitor registration count
2. Filter by event to track sign-ups
3. Verify payment proofs
4. Note any issues/concerns
```

### End of Day
```
1. Export final registration list
2. Save Excel file
3. Note statistics
4. Plan for next day
```

### Final Report
```
1. Go to admin panel
2. Click "Export to Excel"
3. Rename file with date
4. Share with team/management
5. Archive for records
```

---

## 🔗 Quick Links

| Item | Link |
|------|------|
| Admin Panel | `http://localhost:5173/admin` |
| Home Page | `http://localhost:5173/` |
| Full Docs | `ADMIN_PANEL_DOCS.md` |
| Setup Guide | `ADMIN_SETUP_GUIDE.md` |
| API Reference | `ADMIN_API_REFERENCE.md` |

---

## 📞 Getting Help

1. **Check browser console:** Press `F12` → `Console`
2. **Look for error messages** in console
3. **Read documentation** files (linked above)
4. **Verify data connection** to Firebase

---

## 🔒 Security Reminders

- ⚠️ Don't share password via unencrypted channels
- ⚠️ Log out when leaving computer unattended
- ⚠️ Change default password when deployed
- ⚠️ Session expires when browser closes
- ⚠️ Only authorized personnel should have access

---

## 🎓 Learning Resources

**Understanding the features:**
1. Read `ADMIN_SETUP_GUIDE.md`
2. Explore each feature manually
3. Try searching/filtering different ways
4. Practice exporting data

**For developers:**
1. Read `ADMIN_API_REFERENCE.md`
2. Check file structure
3. Understand data flow
4. Customize as needed

---

## ✨ Pro Tips

### Tip 1: Batch export
- Export after each registration batch
- Archive with date
- Create historical records

### Tip 2: Filter combinations
- Department + Event Type = specific event registrations
- Search + Filter = find exact person in specific event

### Tip 3: Statistics analysis
- Use Excel to create charts
- Track registrations over time
- Analyze payment collection

### Tip 4: Backup data
- Export Excel regularly
- Keep dated backups
- Archive for compliance

---

## 📊 Sample Workflow Scenario

```
Monday Morning:
├─ Check admin panel
├─ Registrations: 45
├─ Department breakdown visible
└─ All looking good

Monday Afternoon:
├─ New registrations: +12 (57 total)
├─ Check payment proofs
├─ All screenshots present
└─ Fee collected: ₹8,550

Monday End of Day:
├─ Export to Excel
├─ File: TECH_BLITZ_2K26_Registrations_2026-01-07.xlsx
├─ Send to coordinator
└─ Archive copy saved
```

---

## 🎉 You're All Set!

Your admin panel is ready to use. Start exploring and managing registrations!

**Remember:**
- 📱 Accessible from any browser
- 🔒 Password protected
- 📊 Real-time data
- 📥 Export anytime
- 📈 Track statistics

Happy managing! 🚀

---

**Last Updated:** January 7, 2026
**Version:** 1.0
