# TECH BLITZ 2K26 - Event Registration Website

A modern, responsive event registration website for TECH BLITZ 2K26, a state-level technical symposium hosted by Shree Venkateshwara Hi-Tech Polytechnic College.

## Features

✨ **Modern & Responsive Design**
- Purple + Gold theme matching the event branding
- Fully responsive across mobile, tablet, and desktop
- Smooth animations and transitions
- Mobile-first approach

🎯 **Event Management**
- Department-wise event organization
- Technical, Paper Presentation, and Non-Technical events
- Dynamic event selection based on department
- Paper presentation topics by department

📝 **Registration System**
- Comprehensive registration form with validation
- Real-time form validation
- Success confirmation page
- Loading states and error handling

🔥 **Firebase Integration**
- Firestore database for secure data storage
- Department-specific collections
- Server-side timestamps
- Real-time data persistence

⏱️ **Countdown Timer**
- Live countdown to registration deadline
- Animated display with day/hour/minute/second breakdown
- Responsive timer for all screen sizes

👥 **Coordinator Information**
- Contact details for department coordinators
- Staff and student coordinators listed
- Direct phone links for easy contact

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Custom CSS with responsive design
- **Backend**: Firebase Firestore
- **Icons**: Lucide React
- **State Management**: React Hooks

## Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── Events.tsx       # Events display
│   ├── Coordinators.tsx # Coordinator info
│   ├── RegistrationForm.tsx  # Registration modal
│   ├── CountdownTimer.tsx    # Countdown timer
│   ├── Footer.tsx       # Footer
│   └── *.css            # Component styles
├── types.ts             # TypeScript type definitions
├── data.ts              # Event data and configurations
├── firebase.ts          # Firebase configuration
├── firebaseUtils.ts     # Firebase utility functions
├── index.css            # Global styles
├── App.tsx              # Main app component
├── App.css              # App container styles
└── main.tsx             # React entry point
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Firestore enabled

### 1. Clone the Repository
```bash
git clone <repository-url>
cd techblitz
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase

Create a `.env` file in the root directory with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**⚠️ Important**: Never commit the `.env` file to version control. It's already added to `.gitignore`.

A template file `.env.example` is provided for reference.

### 4. Create Firestore Collections

In your Firebase Console, create the following collections in Firestore:

- `registrations_auto_mech`
- `registrations_cse_aiml`
- `registrations_eee_ece`
- `registrations_civil`
- `registrations_mlt`
- `registrations_non_technical`

### 5. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

### Deploy on GitHub Pages
```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

### Deploy on Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Firebase Data Structure

Each registration document contains:
```json
{
  "name": "string",
  "college": "string",
  "department": "auto_mech|cse_aiml|eee_ece|civil|mlt",
  "year": "1|2|3|4",
  "phone": "string",
  "email": "string",
  "eventType": "technical|paper_presentation|non_technical",
  "eventName": "string",
  "timestamp": "server_timestamp"
}
```

## Features Documentation

### Registration Form
- **Validation**: Client-side validation for all fields
- **Dynamic Events**: Event list updates based on selected department and event type
- **Error Handling**: Clear error messages for validation failures
- **Success Page**: Confirmation page after successful registration

### Events Section
- **Department Cards**: Visual organization by department
- **Event Categories**: Technical events, paper presentation topics
- **Quick Registration**: Direct registration from event card

### Countdown Timer
- **Live Updates**: Updates every second
- **Responsive**: Adapts to all screen sizes
- **Deadline**: Registration closes on 27.01.2026

### Mobile Responsive
- Mobile hamburger menu navigation
- Touch-friendly buttons and forms
- Optimized font sizes and spacing
- Smooth animations on mobile devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Event Details

- **Event Name**: TECH BLITZ 2K26
- **Type**: State Level Technical Symposium
- **Date**: 30 January 2026
- **Registration Fee**: ₹150 per head
- **Prize Worth**: 3 Lakhs
- **Registration Closes**: 27.01.2026
- **Intimation Date**: 28.01.2026

## Contact

For technical issues or inquiries:
- Email: info@svhpc.in
- Phone: +91 8870908071

## License

This project is licensed under the MIT License.

## Credits

Built for SHREE VENKATESHWARA HI-TECH POLYTECHNIC COLLEGE
