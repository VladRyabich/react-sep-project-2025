import {Outlet} from "react-router-dom";
import {RefreshComponent} from "../components/login/RefreshComponent.tsx";

export const MainLayout = () => {
    return (
        <>
            <RefreshComponent/>
            <Outlet/>
        </>
    );
};