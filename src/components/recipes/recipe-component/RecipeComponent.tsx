import {Link} from "react-router-dom";
import {IRecipe} from "../../../models/IRecipe.ts";
import './recipeStyles.css';

type RecipeComponentProps = {
    recipe: IRecipe
}

export const RecipeComponent = ({recipe}: RecipeComponentProps) => {
    return (
        <li className="recipeItem">

            <Link className='recipeLink'
                  to={`/auth/recipes/${recipe.id}`}>

                <h3>{recipe.id}. {recipe.name}</h3>

                <img className='recipesImg'
                     src={recipe.image}
                     alt={recipe.name}/>
            </Link>

            <ul className='recipeListByTag'>
                <h3>Tags:</h3>
                {recipe.tags.map((tag, index) =>

                    <li className={'recipeItemByTag'} key={index}>
                        <Link className='recipeLinkByTag'
                              to={'/auth/recipes/tag/' + tag}>"{tag}"
                        </Link>
                    </li>)

            }</ul>

        </li>
    );
};