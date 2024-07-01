import { TriangleAlertIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background text-card-foreground">
            <div className="max-w-md px-4 py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-6">
                    <TriangleAlertIcon className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-bold mb-2">404 Not Found</h1>
                <p className="text-muted-foreground mb-6">
                    The page you're looking for doesn't exist. Check the URL or go back to the homepage.
                </p>
                <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                >
                    Go to Home
                </Link>
            </div>
        </div>
    )
}
