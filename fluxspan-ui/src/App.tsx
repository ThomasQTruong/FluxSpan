import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { LandingPage } from '@/pages/LandingPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { MainLayout } from '@/layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <SignUpPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
