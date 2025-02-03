import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {HomePage} from "../pages/HomePage.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {UsersPage} from "../pages/UsersPage.tsx";
import {UserDetailsComponent} from "../components/users/user-details-component/UserDetailsComponent.tsx";
import {RecipesPage} from "../pages/RecipesPage.tsx";
import {RecipeDetailsComponent} from "../components/recipes/recipe-details-component/RecipeDetailsComponent.tsx";
import {RecipesByTagComponent} from "../components/recipes/recipes-by-tag-component/RecipesByTagComponent.tsx";

export const routes = createBrowserRouter([
    {path: '/', element: <MainLayout/>, children: [
            {index: true, element: <HomePage/>},
            {path: '/login', element: <LoginPage/>},
            {path: '/auth/users', element: <UsersPage/>},
            {path:'/auth/users/:id', element:<UserDetailsComponent/>},
            {path:'/auth/recipes', element:<RecipesPage/>},
            {path:'/auth/recipes/:id', element:<RecipeDetailsComponent/>},
            {path:'/auth/recipes/tag/:tag', element:<RecipesByTagComponent/>}
        ]}
]);