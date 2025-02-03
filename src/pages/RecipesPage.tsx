import {PaginationComponent} from "../components/pagination/PaginationComponent.tsx";
import {RecipesComponent} from "../components/recipes/recipes-component/RecipesComponent.tsx";
import {SearchRecipesComponent} from "../components/search/SearchRecipesComponent.tsx";
import {MenuComponent} from "../components/menu/MenuComponent.tsx";

export const RecipesPage = () => {
    return (
        <>
            <MenuComponent/>
            <SearchRecipesComponent/>
            <h2 className='infoTitle'>Всі рецепти</h2>
            <RecipesComponent/>
            <PaginationComponent lastPage={5}/>
        </>
    );
};