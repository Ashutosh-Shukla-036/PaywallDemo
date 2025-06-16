import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { Toaster } from 'react-hot-toast';
import { themeAtom } from './store/themeAtom';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Loader } from './components/Loader';

// Lazy load pages for better performance
const LandingPage = React.lazy(() => import('./pages/LandingPage').then(module => ({ default: module.LandingPage })));
const ContentPage = React.lazy(() => import('./pages/ContentPage').then(module => ({ default: module.ContentPage })));
const SignInPage = React.lazy(() => import('./pages/SignInPage').then(module => ({ default: module.SignInPage })));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage').then(module => ({ default: module.SignUpPage })));
const ArticlePage = React.lazy(() => import('./pages/ArticlePage').then(module => ({ default: module.ArticlePage })));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

const AppContent: React.FC = () => {
  const theme = useRecoilValue(themeAtom);

  useEffect(() => {
    // Apply theme to document on mount and theme change
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <main>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <Loader />
            </div>
          }>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/content" element={<ContentPage />} />
              <Route 
                path="/content/:id" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <ArticlePage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: theme === 'dark' ? '#374151' : '#ffffff',
              color: theme === 'dark' ? '#f9fafb' : '#111827',
              border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: theme === 'dark' ? '#374151' : '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: theme === 'dark' ? '#374151' : '#ffffff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
};

function App() {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
}

export default App;