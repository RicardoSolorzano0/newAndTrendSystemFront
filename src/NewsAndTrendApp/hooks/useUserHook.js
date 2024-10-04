import { useEffect } from "react";
import { useNavigate } from "react-router";
import { store } from "../../store/store";

export const useUserHook = () => {
    const { loginStore, setUser, user } = store();
    const navigate = useNavigate();

    useEffect(() => {
        //evaluando que exista token en el local storage
        if (
            localStorage.getItem("accessToken") &&
            localStorage.getItem("refreshToken") &&
            localStorage.getItem("user")
        ) {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            const user = JSON.parse(localStorage.getItem("user"));

            //recuperando el location de el local storage
            const location = localStorage.getItem("location");
            navigate(location);
            setUser({ ...user, accessToken, refreshToken });
            loginStore();
        }
    }, []);

    return {
        user
    }
}
