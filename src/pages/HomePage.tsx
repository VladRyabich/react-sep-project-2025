import {HomeComponent} from "../components/home/HomeComponent.tsx";
import {MenuComponent} from "../components/menu/MenuComponent.tsx";

export const HomePage = () => {
    return (
        <>
            <MenuComponent/>
            <HomeComponent/>
        </>
    );
};