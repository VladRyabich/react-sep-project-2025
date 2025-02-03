import {useEffect} from "react";
import {useAddDispatch} from "../../redux/store.ts";
import {retriveLocalStorage} from "../../services/helpers.ts";
import {IUserWithTokens} from "../../models/IUserWithTokens.ts";
import {authSliceActions} from "../../slices/authSlice.tsx";

export const RefreshComponent = () => {
    const {accessToken, refreshToken} = retriveLocalStorage<IUserWithTokens>('user');
    const dispatch = useAddDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            if(refreshToken){
                dispatch(authSliceActions.refreshTokens(refreshToken));
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [accessToken, refreshToken]);

    return (
        <>
        </>
    );
};