# React Search and Notification System

A modern React application showcasing a search component with keyboard navigation and a notification system built with Redux Toolkit. The project uses Vite, TypeScript, Tailwind CSS, and Framer Motion for animations.

## Features

### Search Component (/search)

- Debounced search functionality
- Keyboard navigation (arrow keys, enter, escape)
- Animated dropdown results
- Clear input button
- Loading states
- Error handling
- Mobile responsive design

### Notification System (/notification)

- Multiple notification types (success, error, info)
- Auto-dismiss after 3 seconds
- Animated transitions
- Redux state management
- Customizable styling
- Stack notifications

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone [https://github.com/bartlomein/nacelle-search]
cd nacelle-search
```

2. Install dependencies:

```bash
npm install
```

## Running the Project

### Development Mode

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Testing

The project uses Jest and React Testing Library for testing.

### Running Tests

```bash
npm test
```

### Running Tests in Watch Mode

```bash
npm test -- --watch
```

## Project Structure

```
src/
├── components/
│   ├── Notification/
│   │   ├── NotificationContainer.tsx
│   │   ├── NotificationItem.tsx
│   │   └── NotificationItem.test.tsx
│   └── Search/
│       ├── Search.tsx
│       └── Search.test.tsx
├── hooks/
│   └── useDebounce.tsx
├── pages/
│   ├── NotificationPage.tsx
│   └── SearchPage.tsx
│   └── WelcomePage.tsx
├── store/
│   ├── hooks.ts
│   ├── index.ts
│   └── notificationSlice.ts
└── App.tsx
```

## Available Routes

- `/` - Welcome page to guide user to the available routes
- `/search` - Search component demonstration
- `/notification` - Notification system demonstration

## Technologies Used

- React 18
- TypeScript
- Redux Toolkit
- Framer Motion
- Tailwind CSS
- Vite
- Jest
- React Testing Library

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Testing Coverage

The project includes comprehensive tests for:

- Search component functionality
- Notification system
- Redux store operations
- User interactions
- Animation presence
- Component rendering
- Error states
