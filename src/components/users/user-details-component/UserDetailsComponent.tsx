import {useAddDispatch, useAppSelector} from "../../../redux/store.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {userSliceActions} from "../../../slices/userSlice.tsx";
import {recipeSliceActions} from "../../../slices/recipeSlice.tsx";
import {RecipeComponent} from "../../recipes/recipe-component/RecipeComponent.tsx";
import './userDetailsStyles.css';
import {MenuComponent} from "../../menu/MenuComponent.tsx";

export const UserDetailsComponent = () => {
    const {user} = useAppSelector(({userSlice}) => userSlice);

    const dispatch = useAddDispatch();

    const {id} = useParams();

    const {recipes} = useAppSelector(({recipeSlice}) => recipeSlice);

    useEffect(() => {
        if(id){
            dispatch(userSliceActions.loadUser(id));
            dispatch(recipeSliceActions.loadAllRecipes());
        }
    }, [id]);
    return (
        <>
        <MenuComponent/>
        <section className={'section'}>

            <div className={'container'}>
                {user &&
                    (<ul className={'userDetailsList'}>
                            <li className={'userDetailsItem'}>
                                <h3 className={'infoTitle'}>{user.id}. {user.firstName} {user.lastName}</h3>
                            </li>
                            <li className={'userDetailsItem'}>
                                <img className={'userImg'} src={user.image} alt={user.lastName}/>
                            </li>
                            <li className={'userDetailsItem'}>
                                <h4 className={'userInfoTitle'}>Age:</h4>
                                <p className={'userInfoText'}>{user.age} years</p>
                            </li>
                            <li className={'userDetailsItem'}>
                                <h4 className={'user'}>Birth date:</h4>
                                <p className={'userInfoText'}>{user.birthDate}</p>
                            </li>
                            <li className={'userDetailsItem'}>
                                <h4 className={'userInfoTitle'}>Email:</h4>
                                <p className={'userInfoText'}>{user.email}</p>
                            </li>
                            <li className={'userDetailsItem'}>
                                <h4 className={'userInfoTitle'}>Phone:</h4>
                                <p className={'userInfoText'}>{user.phone}</p>
                            </li>
                            <li className={'userDetailsItem'}>
                                <h4 className={'userInfoTitle'}>University:</h4>
                                <p className={'userInfoText'}>{user.university}</p>
                            </li>
                        </ul>
                    )}

                <ul className='userResipes'>
                    {id && recipes.map(recipe =>
                        (recipe.userId === +id ? (<RecipeComponent key={recipe.id} recipe={recipe}/>) : null))}
                </ul>
            </div>
        </section>
        </>
    );
};