
import { TriangleAlertIcon } from "lucide-react"
import { Link } from "react-router-dom"

export default function UnAuthorized() {
    return (
        <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-background px-4 md:px-6">
            <div className="mx-auto max-w-md space-y-4 text-center">
                <TriangleAlertIcon className="mx-auto h-12 w-12 text-destructive" />
                <h1 className="text-3xl font-bold">Unauthorized Access</h1>
                <p className="text-muted-foreground">You do not have permission to access the requested resource.</p>
                <Link
                    to="/"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                >
                    Go to Home
                </Link>
            </div>
        </div>
    )
}
