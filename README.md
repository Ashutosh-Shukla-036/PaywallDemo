# PaywallDemo - Premium Content Platform

A modern, fully-featured paywall demonstration application built with React, TypeScript, and Tailwind CSS. This application showcases a complete premium content platform with user authentication, subscription management, mobile responsiveness, and advanced accessibility features.

## 🚀 Features

### Core Functionality
- **Multi-page Application**: Landing page, content library, authentication, user profile, and 404 page
- **Paywall System**: Free and premium content with lock/unlock functionality
- **User Authentication**: Sign in/sign up with form validation and state management
- **Subscription Management**: Free and premium tiers with mock payment processing
- **Theme Support**: Light/dark mode toggle with localStorage persistence
- **Mobile Responsive**: Fully optimized for all device sizes
- **Route Protection**: Protected routes with authentication checks
- **Toast Notifications**: Success/error messages with react-hot-toast
- **Lazy Loading**: Code splitting with React.lazy and Suspense
- **Accessibility**: WCAG compliant with ARIA attributes and keyboard navigation

### Pages
- **Landing Page (/)**: Welcome message and call-to-action
- **Content Library (/content)**: Grid of articles with search and filtering
- **Article Details (/content/:id)**: Full article view for unlocked content (protected)
- **Authentication (/signin, /signup)**: User registration and login forms with validation
- **Profile (/profile)**: User dashboard with subscription management (protected)
- **404 Page**: Custom not found page with helpful navigation

### Components
- **Header**: Responsive navigation with mobile menu and authentication state
- **ArticleCard**: Article preview with premium/free indicators and accessibility
- **PaywallModal**: Subscription prompt for locked content
- **MockPaymentModal**: Simulated payment processing with form validation
- **ThemeToggle**: Light/dark mode switcher
- **Loader**: Loading spinner for async operations
- **ProtectedRoute**: Route protection component

### State Management (Recoil)
- **authAtom**: User authentication and subscription status (persisted)
- **themeAtom**: Theme preference with localStorage persistence
- **unlockAtom**: Individual article unlock tracking (persisted)

## 🛠 Technology Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Recoil for global state with localStorage persistence
- **Routing**: React Router v6 with lazy loading
- **Styling**: Tailwind CSS with dark mode support
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite
- **Development**: Hot reload and TypeScript support

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone repository-url](https://github.com/Ashutosh-Shukla-036/PaywallDemo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Usage Guide

### Getting Started
1. Visit the landing page to explore the platform
2. Navigate to the content library to browse articles
3. Try accessing premium content to trigger the paywall
4. Create an account or sign in to unlock features
5. Subscribe to premium for full access

### Demo Features
- **Authentication**: Use any email/password combination
- **Payment**: Mock payment processing (no real charges)
- **Content**: Mix of free and premium articles
- **Themes**: Toggle between light and dark modes
- **Responsive**: Test on different screen sizes
- **Accessibility**: Navigate using keyboard only

### Mobile Experience
- Responsive design works on all screen sizes
- Mobile-optimized navigation menu
- Touch-friendly interface elements
- Optimized typography and spacing

## 🎨 Design Features

### Visual Design
- Modern, clean interface with premium aesthetics
- Gradient backgrounds and smooth animations
- Professional color scheme with proper contrast ratios
- Consistent spacing using 8px system
- Apple-level design attention to detail

### User Experience
- Intuitive navigation and clear visual hierarchy
- Smooth transitions and micro-interactions
- Loading states and feedback for user actions
- Responsive design for all device sizes
- Comprehensive accessibility support

### Interactive Elements
- Hover states for all interactive components
- Animated payment processing simulation
- Theme switching with smooth transitions
- Modal dialogs for paywall and payments
- Search and filtering functionality
- Toast notifications for user feedback

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (single column, touch-optimized)
- **Small Mobile**: < 475px (extra small screens)
- **Tablet**: 640px - 1024px (responsive grid)
- **Desktop**: > 1024px (full layout)

## ♿ Accessibility Features

### WCAG Compliance
- Semantic HTML structure
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management and indicators
- Color contrast compliance
- Alternative text for images

### Keyboard Navigation
- Tab order follows logical flow
- Enter/Space key activation
- Escape key for modal dismissal
- Arrow keys for menu navigation
- Focus trapping in modals

### Screen Reader Support
- Descriptive labels and roles
- Status announcements
- Error message associations
- Loading state announcements

## 🔧 Performance Optimizations

### Code Splitting
- Lazy loading of route components
- Suspense boundaries with loading states
- Reduced initial bundle size

### State Persistence
- localStorage integration for user preferences
- Automatic state restoration on page reload
- Efficient state updates with Recoil

### Image Optimization
- Lazy loading for article images
- Responsive image sizing
- Optimized loading states

## 🚀 Advanced Features

### Route Protection
- Authentication-based route guards
- Automatic redirects to sign-in
- Return URL preservation
- Premium content access control

### Form Validation
- Real-time validation feedback
- Accessible error messages
- Input formatting (card numbers, dates)
- Loading states during submission

### Toast Notifications
- Success/error message system
- Theme-aware styling
- Automatic dismissal
- Accessible announcements

### Async Utilities
- Realistic API simulation
- Loading delays for demonstration
- Error handling and recovery
- Promise-based architecture

## 🔧 Customization

### Adding New Articles
Edit `src/data/mockArticles.ts` to add more content:
```typescript
{
  id: 'unique-id',
  title: 'Article Title',
  excerpt: 'Brief description...',
  content: 'Full article content...',
  image: 'https://images.pexels.com/...',
  isPremium: true, // or false for free content
  readTime: 5,
  category: 'Technology',
  publishedAt: '2024-01-01'
}
```

### Styling Customization
- Modify `tailwind.config.js` for theme customization
- Update color schemes in component files
- Adjust animations and transitions as needed
- Customize responsive breakpoints

### Feature Extensions
- Add real payment processing integration
- Implement backend API connections
- Add user preferences and settings
- Include social sharing features
- Add comment systems or user interactions
- Implement search functionality
- Add content management system

## 🚀 Deployment

The application is ready for deployment to any static hosting service:

- **Build**: `npm run build` creates optimized production files
- **Output**: `dist/` folder contains all static assets
- **Hosting**: Compatible with Netlify, Vercel, GitHub Pages, etc.
- **Environment**: No server-side requirements

## 📄 License

This project is a demonstration application for educational purposes. Feel free to use it as a reference for building your own paywall implementations.

## 🤝 Contributing

This is a demo project, but suggestions and improvements are welcome! Feel free to fork the repository and experiment with additional features.

## 🔍 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Authentication flow works
- [ ] Paywall system functions
- [ ] Theme switching works
- [ ] Mobile responsiveness
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Form validation
- [ ] Toast notifications
- [ ] Route protection

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

**Note**: This is a demonstration application with simulated features. No real payments are processed, and user data is stored only in browser localStorage. The application showcases modern web development practices including accessibility, performance optimization, and responsive design.
