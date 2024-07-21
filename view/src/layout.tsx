import { Outlet } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Header from './components/shared/header';
import Footer from './components/shared/footer';
export default function AppLayout() {
    return (
        <section >
            <Header />
            <main className='min-h-screen'>
                <Outlet />
            </main>
            <Footer />
            <Toaster />
        </section>
    );
}