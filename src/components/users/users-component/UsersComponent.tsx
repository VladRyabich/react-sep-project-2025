import {useAddDispatch, useAppSelector} from "../../../redux/store.ts";
import {useEffect} from "react";
import {userSliceActions} from "../../../slices/userSlice.tsx";
import {useSearchParams} from "react-router-dom";
import {UserComponent} from "../user-component/UserComponent.tsx";
import './usersStyles.css';

export const UsersComponent = () => {
    const {users} = useAppSelector(({userSlice}) => userSlice);
    const dispatch = useAddDispatch();
    const [searchParams] = useSearchParams({page:'1'});

    useEffect(() => {
        const currentPage = searchParams.get('page') || '1';
        dispatch(userSliceActions.loadUsers(currentPage));
    },[searchParams]);

    return (
        <section className={'section'}>
            <div className={'container'}>
                <ul className='usersList'>
                    {
                        users.map(user => <UserComponent key={user.id} user={user}/>)
                    }
                </ul>
            </div>
        </section>
    );
};