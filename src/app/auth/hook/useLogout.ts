import { logoutService } from "../service/logout.service";
import { useRouter } from "next/navigation";

export function useLogout() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await logoutService.logout();
            return res;
        } catch (err) {
            console.error("Logout failed:", err);
            return null;
        }
    };

    return {
        handleLogout,
    };
}
