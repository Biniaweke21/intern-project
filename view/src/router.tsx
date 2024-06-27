import { createBrowserRouter } from 'react-router-dom';
import RegistrationForm from './components/shared/registration-form';
import { SigninForm } from './components/shared/signin-form';
import AppLayout from './layout';
import CompleteFormPage from './pages/complete-form-page';
import { default as Dashboard, default as DashboardPage } from './pages/dashboard-page';
import ErrorPage from './pages/error-page';
import UpdateEmployeeForm from './components/shared/update-employee-form';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [{
            path: "/",
            element: <DashboardPage />
        },
        {
            path: "employee",
            element: <Dashboard />,
        },
        {
            path: "employee/:id",
            element: <CompleteFormPage />
        },
        {
            path: "employee/edit/:id",
            element: <UpdateEmployeeForm />
        },
        {
            path: "/new",
            element: <RegistrationForm />
        },
        {
            path: "dashboard",
            element: <DashboardPage />,
        },
        {
            path: "auth",
            element: <SigninForm />
        },
        ]
    }
])
