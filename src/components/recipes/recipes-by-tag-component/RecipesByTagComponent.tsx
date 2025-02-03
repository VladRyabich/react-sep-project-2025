import {useAddDispatch, useAppSelector} from "../../../redux/store.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {recipeSliceActions} from "../../../slices/recipeSlice.tsx";
import {RecipeComponent} from "../recipe-component/RecipeComponent.tsx";

export const RecipesByTagComponent = () => {
    const {recipesByTag: recipesByTagName} = useAppSelector(({recipeSlice})=>recipeSlice);

    const dispatch = useAddDispatch();

    const {tag} = useParams();

    useEffect(() => {
        if (tag) {
            dispatch(recipeSliceActions.loadRecipesByTag(tag))
        }
    }, [tag]);

    return (
        <div className='recipesByTagName'>
            {recipesByTagName.map(recipe=><RecipeComponent key={recipe.id} recipe={recipe}/>)}
        </div>
    );

};