import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layout';
import ErrorPage from './pages/error-page';
import EmployeePage from './pages/employee-page';
import AuthPage from './pages/auth-page';
import DashboardPage from './pages/dashboard-page';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/employee",
                element: <EmployeePage />,
                children: [
                    {
                        path: "/new",
                        element: <EmployeePage />
                    },
                    {
                        path: "/edit/:id",
                        element: <EmployeePage />
                    },
                ]

            },
            {
                path: "/dashboard",
                element: <DashboardPage />,
            },
            {
                path: "/auth",
                element: <AuthPage />
            },
        ]
    }
])
