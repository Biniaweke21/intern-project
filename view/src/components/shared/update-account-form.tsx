import { apiClient } from '@/api/config';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { z } from "zod";
import { toast } from "../ui/use-toast";

const updateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long").optional(),
});

type UpdateFormData = z.infer<typeof updateSchema>;

export function UpdateAccountForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateFormData>({
        resolver: zodResolver(updateSchema),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<UpdateFormData | null>(null);

    const loadUserInfo = async () => {
        try {
            const response = await apiClient.get(`/api/users/${id}`);
            setUserInfo(response.data.user);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                    description: error.response?.data.message || "Unable to load user information",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userInfo) {
            reset(userInfo);
        }
    }, [userInfo, reset]);

    const onSubmit: SubmitHandler<UpdateFormData> = async (data) => {
        setIsSubmitting(true);
        try {
            await apiClient.put(`/api/users/${id}`, data);
            toast({
                description: "User updated successfully!",
            });
            navigate('/admin/accounts');
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                    description: error.response?.data.message || 'An error occurred',
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className='p-5 md:p-10 flex items-center justify-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Update User</CardTitle>
                    <CardDescription>
                        Update your user details below.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                placeholder="John Doe"
                                required
                                disabled={isSubmitting}
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                {...register("email")}
                                type="email"
                                placeholder="john@example.com"
                                required
                                disabled={isSubmitting}
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </main>
    );
}
