import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";

export const routes = createBrowserRouter([
    {path: '/', element: <MainLayout/>}
]);