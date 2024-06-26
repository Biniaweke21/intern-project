import { Outlet } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Header from './components/shared/header';
export default function AppLayout() {
    return (
        <section >
            <Header />
            <Outlet />
            <Toaster />
        </section>
    );
}