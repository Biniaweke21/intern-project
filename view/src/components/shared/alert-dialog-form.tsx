import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface AlertDialogProps {
    id: string;
    onDelete: (id: string) => Promise<void>;
    title?: string;
    description?: string;
    actionLabel?: string;
    cancelLabel?: string;
}

export function AlertDialogForm({
    id,
    onDelete,
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    actionLabel = "Continue",
    cancelLabel = "Cancel",
}: AlertDialogProps) {
    const handleDelete = async () => {
        try {
            await onDelete(id);
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-700 text-white" onClick={handleDelete}>{actionLabel}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
