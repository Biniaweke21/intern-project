import { createBrowserRouter } from 'react-router-dom';
import { SigninForm } from './components/shared/signin-form';
import AppLayout from './layout';
import DashboardPage from './pages/dashboard-page';
import EmployeePage from './pages/employee-page';
import ErrorPage from './pages/error-page';
import RegistrationForm from './components/shared/registration-form';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [{
            path: "/",
            element: <DashboardPage />
        }
            ,
        {
            path: "employee",
            element: <RegistrationForm />,
            children: [
                {
                    path: "new",
                    element: <RegistrationForm />
                },
                {
                    path: "edit/:id",
                    element: <EmployeePage />
                },
            ]

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
