
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
    const router = useRouter();
    
    const singnOut = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'content-type': 'application/json',
                    }
                }
            )

            if (!res.ok) throw new Error();

            toast.success('Signed out successfully');

            router.push('/sign-in');
            router.refresh();
        } catch (err) { 
            toast.error("Could'nt sign out please try again.");
        }
    }

    return { singnOut };
}