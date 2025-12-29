# Daily Hug Interview App

An emotional check-in flow that guides users through a series of questions, provides personalized mirror reflections, and offers Hug Society membership options.

## Overview

This React + Vite application creates a warm, empathetic interview experience that:
- Collects user email (from query param or input)
- Guides users through age, gender, and 9 emotional questions
- Provides mid-flow mirror screens for emotional safety
- Generates dynamic final mirror results based on answers
- Introduces Alex (chat-style interface)
- Routes to personalized offer pages based on user responses
- Integrates with GoHighLevel API for contact management and tagging

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **GoHighLevel API** - Contact management and tagging

## Project Structure

```
src/
├── components/          # Screen components
│   ├── EntryScreen.jsx
│   ├── EmailScreen.jsx
│   ├── QuestionScreen.jsx
│   ├── MirrorA.jsx     # Early safety mirror
│   ├── MirrorB.jsx     # Cost mirror
│   ├── MirrorC.jsx     # Self-perception mirror
│   ├── MirrorD.jsx     # Nervous system mirror
│   ├── MirrorScreen.jsx # Final mirror
│   ├── AlexScreen.jsx
│   ├── DailyHugConfirmation.jsx
│   ├── OfferScreen.jsx (legacy - now using pages)
│   ├── BuyerWelcome.jsx
│   └── NonBuyerClose.jsx
├── pages/              # Route-based pages
│   ├── AnnualOfferPage.jsx
│   └── MonthlyOfferPage.jsx
├── utils/
│   ├── questions.js    # Question definitions
│   ├── acknowledgments.js # Mirror logic
│   └── ghlApi.js       # GoHighLevel integration
├── InterviewFlow.jsx   # Main interview flow
├── AppRouter.jsx       # Routing configuration
└── main.jsx            # App entry point
```

## Flow Overview

1. **Entry Screen** - Introduction and contract
2. **Email Collection** - If no `?vip=email` query param
3. **Age Question** - Demographic context
4. **Gender Question** - Demographic context
5. **Transition** - "Thanks. Let's check in."
6. **Emotional Questions (9)** - With mirror screens interspersed:
   - Q3 → Mirror A (Early Safety)
   - Q5 → Mirror B (Cost)
   - Q7 → Mirror C (Self-Perception)
   - Q8 → Mirror D (Nervous System)
7. **Micro-pause** - Brief transition
8. **Final Mirror** - Dynamic results based on answers
9. **Alex Intro** - Chat-style introduction
10. **Routing** - Based on responses:
    - If `alex-interested` OR `freq_twice` OR `freq_multi` → `/offer`
    - If declined annual → `/monthly`
    - Otherwise → Daily Hug confirmation

## Design System

### Colors
- **Primary Background**: `#FFF6F4` (warm blush)
- **Secondary Background**: `#FFF8F2` (gentle sand)
- **Text Primary**: `#2B2B2B` (charcoal, not black)
- **Text Secondary**: `#6F6F6F` (soft slate)
- **Button Primary**: `#4A5D73` (warm blue-gray)
- **Coral Accent**: `#E87C6A` (used sparingly for questions/selected states)

### Typography
- **Font**: Montserrat (400, 500, 600 weights)
- **Base Size**: 18px
- **Headlines**: 1.75rem (h1), 1.5rem (h2)
- **No italics, no all-caps, no letterspacing tricks**

### Spacing
- **Horizontal Padding**: 20-24px
- **Vertical Rhythm**: Generous spacing
- **Mobile-first** approach

### Buttons
- **Answer Buttons**: 14px border radius, increased padding (20px vertical)
- **Selected State**: Coral border, left accent bar, coral wash background
- **Primary Buttons**: Full width, rounded corners

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GHL_API_KEY=your_ghl_api_key_here
VITE_GHL_LOCATION_ID=your_location_id_here
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

```bash
npm run build
```

## Features

### Email Collection
- Reads `?vip=email@example.com` query parameter
- If no query param, shows email input screen first
- Email validation with regex
- Console logging shows email source

### GoHighLevel Integration
- Automatically searches for contact by email after each question
- Creates contact if not found
- Tags contact with `dh_checkin --> q{questionId}_{answerValue}` format
- Tags special events: `alex-interested`, `alex-hesitant`, `hs-annual`, `hs-monthly`, `hs-declined`, `interview-complete`
- Non-blocking - won't interrupt user flow if API fails

### Dynamic Offer Pages
- **Annual Offer** (`/offer` or `/annual`):
  - Conditional transitions based on user responses
  - Fast-action bonuses (48-hour window)
  - Price anchor: 27¢ a day, then $97/year
  - Redirects to `https://dailyhug.com/order`
  
- **Monthly Offer** (`/monthly`):
  - Soft, non-pressure approach
  - 3-month minimum expectation setting
  - Redirects to `https://dailyhug.com/order-monthly`

### Mirror Logic
- **Mirror A**: Static early safety acknowledgment
- **Mirror B**: Conditional based on draining/looping responses
- **Mirror C**: Conditional based on self-relationship responses
- **Mirror D**: Conditional based on rest/energy responses
- **Final Mirror**: Dynamic 2-3 lines based on strongest patterns

## Routing

- `/` - Interview flow (entry point)
- `/offer` or `/annual` - Annual offer page
- `/monthly` - Monthly offer page

## User Data Flow

User data (answers, tags, email) is:
1. Stored in component state during interview
2. Saved to `localStorage` as `dh_userData` when interview completes
3. Passed via route state when navigating to offer pages
4. Retrieved from localStorage if route state is unavailable

## Deployment

This app is deployed on Vercel. Ensure environment variables are set in Vercel dashboard:
- `VITE_GHL_API_KEY`
- `VITE_GHL_LOCATION_ID`

## Key Principles

- **No progress indicators** - Users don't see "Step X of Y"
- **No back/forward navigation** - Linear flow only
- **No free text** - All answers are single-select
- **One question per screen** - No scrolling on question screens
- **Generous whitespace** - Nothing touches screen edges emotionally
- **Fade-only animations** - No color flashes or pulsing
- **Mobile-first** - 80%+ of users on mobile

## License

Private project - All Rights Reserved
