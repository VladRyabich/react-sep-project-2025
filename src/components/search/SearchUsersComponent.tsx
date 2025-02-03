import {useAddDispatch, useAppSelector} from "../../redux/store.ts";
import {useForm} from "react-hook-form";
import {userSliceActions} from "../../slices/userSlice.tsx";
import {UserComponent} from "../users/user-component/UserComponent.tsx";
import './searchStyles.css';

export const SearchUsersComponent = () => {
    const {searchedUsers} = useAppSelector(({userSlice})=>userSlice);
    const dispatch = useAddDispatch();

    const {register, handleSubmit, watch} = useForm<{query:string}>();

    const query = watch("query");

    const handler = async ({query}:{query : string})=> {
        const trimmedQuery = query.trim();
        if(trimmedQuery.length > 1 || !isNaN(Number(trimmedQuery))){
            await dispatch(userSliceActions.searchUsers(trimmedQuery));
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
                                disabled={!query?.trim() || Number(query?.trim()) > 208}>Search Users
                        </button>
                    </form>
                </div>
                <ul className='usersList'>
                    {searchedUsers.map(user => <UserComponent key={user.id} user={user}/>)}
                </ul>
            </div>
        </section>
    );
};