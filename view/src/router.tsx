import { createBrowserRouter } from 'react-router-dom';
import { RegisterAccountForm } from './components/shared/account-form';
import EmployeeDetailForm from './components/shared/employee-detail-form';
import RegistrationForm from './components/shared/registration-form';
import { SigninForm } from './components/shared/signin-form';
import { UpdateAccountForm } from './components/shared/update-account-form';
import UpdateEmployeeForm from './components/shared/update-employee-form';
import AppLayout from './layout';
import AdminDashboard from './pages/admin-page';
import CompleteFormPage from './pages/complete-form-page';
import { default as Dashboard, default as DashboardPage } from './pages/dashboard-page';
import ErrorPage from './pages/error-page';


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
            path: "/employee/detail/:id",
            element: <EmployeeDetailForm />
        },
        {
            path: "dashboard",
            element: <DashboardPage />,
        },
        {
            path: "auth",
            element: <SigninForm />
        },
        {
            path: "admin",
            element: <AdminDashboard />
        },
        {
            path: "admin/accounts",
            element: <AdminDashboard />
        },
        {
            path: "admin/accounts/edit/:id",
            element: <UpdateAccountForm />
        },
        {
            path: "admin/accounts/new",
            element: <RegisterAccountForm />
        },
        ]
    }
])
