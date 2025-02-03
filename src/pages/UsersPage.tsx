import {SearchUsersComponent} from "../components/search/SearchUsersComponent.tsx";
import {UsersComponent} from "../components/users/users-component/UsersComponent.tsx";
import {PaginationComponent} from "../components/pagination/PaginationComponent.tsx";
import {MenuComponent} from "../components/menu/MenuComponent.tsx";

export const UsersPage = () => {
    return (
        <>
            <MenuComponent/>
            <SearchUsersComponent/>
            <h2 className='infoTitle'>Всі юзери</h2>
            <UsersComponent/>
            <PaginationComponent lastPage={7}/>
        </>
    );
};