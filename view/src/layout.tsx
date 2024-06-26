import { Outlet } from 'react-router-dom';
export default function AppLayout() {
    return (
        <section>
            <Outlet />
        </section>
    );
}