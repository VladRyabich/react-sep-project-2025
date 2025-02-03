import {useAddDispatch, useAppSelector} from "../../../redux/store.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {recipeSliceActions} from "../../../slices/recipeSlice.tsx";
import {RecipeComponent} from "../recipe-component/RecipeComponent.tsx";
import './recipesStyles.css';

export const RecipesComponent = () => {
    const {recipes} = useAppSelector(({recipeSlice}) => recipeSlice);

    const [searchParams] = useSearchParams({page:'1'});

    const dispatch = useAddDispatch();

    useEffect(() => {
        const currentPage = searchParams.get('page') || '1';
        dispatch(recipeSliceActions.loadPaginatedRecipes(currentPage));
    }, [searchParams]);
    return (
        <section className='section'>
            <div className={'container'}>
                <ul className={'recipesList'}>
                    {
                        recipes.map(recipe => <RecipeComponent key={recipe.id} recipe={recipe}/>)
                    }
                </ul>
            </div>
        </section>
    );
};