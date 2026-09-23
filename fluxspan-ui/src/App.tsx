import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { LandingPage } from '@/pages/LandingPage';
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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
