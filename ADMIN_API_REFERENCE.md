# Admin Panel - API Reference

## Components

### `AdminPage` Component
**File:** `src/components/AdminPage.tsx`

Wrapper component that handles authentication state.

**Props:** None

**Returns:** `AdminAuth` (if not authenticated) or `Admin` (if authenticated)

**Usage:**
```typescript
import { AdminPage } from './components';

<Route path="/admin" element={<AdminPage />} />
```

---

### `AdminAuth` Component
**File:** `src/components/AdminAuth.tsx`

Authentication screen component.

**Props:**
```typescript
interface AdminAuthProps {
  onAuthenticate: () => void;  // Called when password is correct
}
```

**Features:**
- Password input field
- Error messages for incorrect passwords
- Lockout after 3 failed attempts
- Session storage integration

**Usage:**
```typescript
<AdminAuth onAuthenticate={() => setIsAuthenticated(true)} />
```

---

### `Admin` Component
**File:** `src/components/Admin.tsx`

Main admin panel interface.

**Props:** None

**Features:**
- Registration table with all data
- Search and filter functionality
- Payment proof viewer
- Excel export button
- Statistics dashboard
- Responsive design

**State:**
```typescript
registrations[]          // All fetched registrations
loading: boolean        // Fetching state
error: string          // Error messages
exporting: boolean     // Export state
searchTerm: string     // Current search text
filterDepartment: string
filterEventType: string
showImages: Record     // Toggle image visibility
```

**Usage:**
```typescript
import { Admin } from './components';

<Admin />
```

---

## Utilities

### `adminUtils.ts` Functions

#### `getAllRegistrations()`

Fetches all registrations from Firestore.

**Signature:**
```typescript
export const getAllRegistrations = async (): Promise<(Registration & { id: string })[]>
```

**Parameters:** None

**Returns:**
- Array of Registration objects with document IDs
- Fetches from all 6 department collections
- Combines into single array

**Error Handling:**
- Throws error if fetch fails
- Logs error to console
- Propagates to caller

**Example:**
```typescript
const registrations = await getAllRegistrations();
console.log(registrations.length); // Total registrations
```

---

#### `exportToExcel(registrations)`

Exports registrations to Excel file.

**Signature:**
```typescript
export const exportToExcel = (registrations: (Registration & { id: string })[]): void
```

**Parameters:**
- `registrations[]` - Array of registration objects

**Returns:** Void (triggers browser download)

**Excel Columns:**
| Column | Source |
|--------|--------|
| ID | Document ID |
| Name | reg.name |
| College | reg.college |
| Department | reg.department |
| Year | reg.year |
| Phone | reg.phone |
| Email | reg.email |
| Event Type | reg.eventType |
| Event Name | reg.eventName |
| Payment Screenshot | reg.paymentScreenshot |
| Registered On | reg.timestamp |

**Filename Format:**
```
TECH_BLITZ_2K26_Registrations_YYYY-MM-DD.xlsx
```

**Features:**
- Optimized column widths
- Formatted dates
- Professional styling
- Auto-downloads to user's computer

**Example:**
```typescript
import { exportToExcel } from '../adminUtils';

const handleExport = () => {
  exportToExcel(registrations);
};
```

---

#### `getRegistrationStats(registrations)`

Calculates statistics from registrations.

**Signature:**
```typescript
export const getRegistrationStats = (registrations: Registration[]) => {
  total: number;
  byDepartment: Record<string, number>;
  byEventType: Record<string, number>;
  byYear: Record<string, number>;
}
```

**Parameters:**
- `registrations[]` - Array of registration objects

**Returns:**
```typescript
{
  total: 150,                          // Total registrations
  byDepartment: {
    'auto_mech': 25,
    'cse_aiml': 40,
    'eee_ece': 35,
    'civil': 30,
    'mlt': 20
  },
  byEventType: {
    'technical': 80,
    'non_technical': 50,
    'paper_presentation': 20
  },
  byYear: {
    '1': 40,
    '2': 60,
    '3': 50
  }
}
```

**Example:**
```typescript
import { getRegistrationStats } from '../adminUtils';

const stats = getRegistrationStats(registrations);
console.log(`Total fee: ₹${stats.total * 150}`);
```

---

## Data Types

### Registration Interface
**File:** `src/types.ts`

```typescript
export interface Registration {
  name: string;
  college: string;
  department: Department;
  year: string;
  phone: string;
  email: string;
  eventType: EventType;
  eventName: string;
  paymentScreenshot?: string;  // Cloudinary URL
  timestamp: Date;
}
```

### Department Type
```typescript
export type Department = 
  | 'auto_mech' 
  | 'cse_aiml' 
  | 'eee_ece' 
  | 'civil' 
  | 'mlt';
```

### EventType
```typescript
export type EventType = 
  | 'technical' 
  | 'non_technical' 
  | 'paper_presentation';
```

---

## Firestore Collections

### Collection Names
```typescript
// Department collections
'registrations_auto_mech'
'registrations_cse_aiml'
'registrations_eee_ece'
'registrations_civil'
'registrations_mlt'

// Non-technical collection
'registrations_non_technical'
```

### Document Structure
Each document in these collections contains:
```typescript
{
  name: string,
  college: string,
  department: string,
  year: string,
  phone: string,
  email: string,
  eventType: string,
  eventName: string,
  paymentScreenshot: string,  // Cloudinary URL
  timestamp: Timestamp
}
```

---

## Routes

### Admin Routes
```typescript
// Main application
'/'        → Home page

// Admin panel
'/admin'   → Protected admin page (requires authentication)
```

### Router Configuration
**File:** `src/main.tsx`

```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/admin" element={<AdminPage />} />
  </Routes>
</BrowserRouter>
```

---

## Environment Variables

Required in `.env`:

```env
# Firebase (existing)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...

# Cloudinary (for payment proofs)
VITE_CLOUDINARY_CLOUD_NAME=dhq0xlc5r
VITE_CLOUDINARY_API_KEY=973198229761744
VITE_CLOUDINARY_API_SECRET=bbqSs9Ye_LclyjIidTVfRCrecZw
VITE_CLOUDINARY_UPLOAD_PRESET=tech_blitz_2k26
```

---

## Dependencies

### Required Packages
```json
{
  "react-router-dom": "^7.11.0",
  "xlsx": "^0.18.5"
}
```

### Import Statements
```typescript
// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// XLSX (Excel export)
import * as XLSX from 'xlsx';

// Firestore
import { collection, getDocs } from 'firebase/firestore';
```

---

## CSS Classes Reference

### Main Container
- `.admin-container` - Main wrapper
- `.admin-header` - Header section
- `.loading-state` - Loading indicator

### Controls
- `.admin-controls` - Filter and export section
- `.search-and-filters` - Search bar and dropdowns
- `.search-input` - Search input field
- `.filter-select` - Filter dropdowns
- `.btn-export` - Export button

### Table
- `.table-wrapper` - Table container
- `.registrations-table` - Main table
- `.name-cell` - Name column
- `.email-cell` - Email column
- `.event-name` - Event name column
- `.payment-cell` - Payment proof column
- `.date-cell` - Date column

### Badges
- `.badge` - Base badge style
- `.badge-dept` - Department badge
- `.badge-event` - Event type badge

### Statistics
- `.stats-grid` - Stats container
- `.stat-card` - Individual stat
- `.stats-section` - Department breakdown

---

## Common Tasks

### Add a New Filter
```typescript
// In Admin.tsx component state
const [filterNew, setFilterNew] = useState('');

// In filter section
<select onChange={(e) => setFilterNew(e.target.value)}>
  <option value="">All Options</option>
  {/* options */}
</select>

// In filteredRegistrations
const matchesNew = !filterNew || reg.property === filterNew;
```

### Export Custom Columns
```typescript
// In exportToExcel function
const data = registrations.map((reg) => ({
  'Your Column': reg.field,
  // ... add columns
}));
```

### Add New Statistics
```typescript
// In getRegistrationStats function
stats.byCollege = {};
registrations.forEach((reg) => {
  stats.byCollege[reg.college] = 
    (stats.byCollege[reg.college] || 0) + 1;
});
```

---

## Troubleshooting API Issues

### `getAllRegistrations()` returns empty
- Check Firebase credentials
- Verify Firestore collections exist
- Check Firestore security rules
- Verify data has been saved

### `exportToExcel()` doesn't download
- Check browser download settings
- Try different browser
- Clear browser cache
- Check browser console for errors

### `getRegistrationStats()` shows 0
- Verify registrations array is not empty
- Check data structure matches interface
- Log registrations array to debug

---

## Performance Considerations

| Operation | Performance |
|-----------|-------------|
| Load registrations | ~500ms-2s (depends on count) |
| Search/Filter | Instant (client-side) |
| Export to Excel | ~1-5s (depends on count) |
| Calculate Stats | <100ms |
| Render Table | ~500ms-1s |

---

## Security Best Practices

1. **Password Management**
   - Store in environment variable
   - Use strong password
   - Change periodically

2. **Authentication**
   - Implement backend auth in production
   - Use JWT tokens
   - Expire sessions properly

3. **Data Access**
   - Verify user permissions
   - Log access attempts
   - Rate limit API calls

4. **Deployment**
   - Use HTTPS only
   - Implement CORS properly
   - Regular security audits

---

For more detailed documentation, see:
- `ADMIN_PANEL_DOCS.md` - Full documentation
- `ADMIN_SETUP_GUIDE.md` - Setup instructions
- `ADMIN_IMPLEMENTATION_SUMMARY.md` - Implementation details
