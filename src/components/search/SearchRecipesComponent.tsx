import {useAddDispatch, useAppSelector} from "../../redux/store.ts";
import {useForm} from "react-hook-form";
import {recipeSliceActions} from "../../slices/recipeSlice.tsx";
import {RecipeComponent} from "../recipes/recipe-component/RecipeComponent.tsx";
import './searchStyles.css';

export const SearchRecipesComponent = () => {
    const {searchedRecipes} = useAppSelector(({recipeSlice})=>recipeSlice);
    const dispatch = useAddDispatch();

    const {register, handleSubmit, watch} = useForm<{query:string}>();

    const query = watch("query");

    const handler = async ({query}:{query : string})=> {
        const trimQuery = query.trim();
        
        if (trimQuery.length > 1 || !isNaN(Number(trimQuery))) {
            await dispatch(recipeSliceActions.searchRecipes(trimQuery));
        }
    }
    return (
        <section className={'section'}>
            <div className={'container'}>
                <div className='search'>
                    <h3 className={'searchTitle'}>Пошук: </h3>
                    <form className='form' onSubmit={handleSubmit(handler)}>
                        <label>
                            <input type="text" {...register('query', {required: "Field cannot be empty"})}/>
                        </label>

                        <button className='searchBtn'
                                type='submit'
                                disabled={!query?.trim() || Number(query?.trim()) > 50}>
                            Search Recipes
                        </button>
                    </form>
                </div>

                <ul className='recipesList'>
                    {searchedRecipes.map(recipe => <RecipeComponent key={recipe.id} recipe={recipe}/>)}
                </ul>
            </div>
        </section>
    );
};