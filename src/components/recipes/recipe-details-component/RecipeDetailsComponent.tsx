import {Link, useParams} from "react-router-dom";
import {useAddDispatch, useAppSelector} from "../../../redux/store.ts";
import {useEffect} from "react";
import {recipeSliceActions} from "../../../slices/recipeSlice.tsx";
import {MenuComponent} from "../../menu/MenuComponent.tsx";
import './recipeDetailsStyles.css';

export const RecipeDetailsComponent = () => {
    const {id} = useParams();
    const {recipe} = useAppSelector(({recipeSlice}) => recipeSlice);
    const dispatch = useAddDispatch();

    useEffect(() => {
        if(id){
            dispatch(recipeSliceActions.loadRecipe(id))
        }
    }, [id]);
    return (
        <>
            <MenuComponent/>

            <section className={'section'}>
                {
                    recipe && <div className='container'>

                        <ul className='recipeDetailsList'>
                            <li className={'recipeDetailsItem recipeTitle'}>
                                <h2 className={'infoTitle'}>{recipe.id}. {recipe.name} </h2>
                            </li>
                            <li className={'recipeDetailsItem'}>
                                <h3>Створено користувачем:</h3>
                                <Link className='recipeUserLink' to={`/auth/users/${recipe.userId}`}>
                                    <h3>UserId: {recipe.userId}</h3>
                                </Link>
                            </li>

                            <li className={'recipeDetailsItem recipeImgItem'}>
                                <img className='recipeImg' src={recipe.image} alt={recipe.name}/>
                            </li>
                            <li className={'recipeDetailsItem'}>
                                {!(recipe.cookTimeMinutes === 0) &&
                                    <p><span className={'recipeDetailsSubtitle recipeSpan'}>Cook time:</span>
                                        {recipe.cookTimeMinutes} minutes
                                    </p>}
                            </li>
                            <li className={'recipeDetailsItem'}>
                                {!(recipe.prepTimeMinutes === 0) &&
                                    <p><span className={'recipeDetailsSubtitle recipeSpan'}>Prepare time:</span>
                                        {recipe.prepTimeMinutes} minutes
                                    </p>}
                            </li>
                            <li className={'recipeDetailsItem'}>
                                <h4>Difficulty:</h4>
                                <p>{recipe.difficulty}</p>
                            </li>
                            <li className={'recipeDetailsItem'}>
                                <h4>Instructions:</h4>
                                <p>{recipe.instructions}</p>
                            </li>
                            <li className={'recipeDetailsItem'}>
                                <h4>Cuisine:</h4>
                                <p>{recipe.cuisine}</p>
                            </li>
                            <li className={'recipeDetailsItem'}>
                                <h4>Calories:</h4>
                                <p>{recipe.caloriesPerServing}</p>
                            </li>
                            <li className='recipeDetailsItem recipeLinkByTagName'>
                                <h4>Tags:</h4>
                                {recipe.tags.map((tag, index) =>
                                    <p key={index}>
                                        <Link className='recipeLink' to={'/auth/recipes/tag/' + tag}>"{tag}"</Link>
                                    </p>)}
                            </li>
                        </ul>
                    </div>
                }
            </section>
        </>
    );
};