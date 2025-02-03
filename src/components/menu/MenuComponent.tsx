import {Link} from "react-router-dom";
import {useAddDispatch, useAppSelector} from "../../redux/store.ts";
import {useEffect, useState} from "react";
import {logout} from "../../slices/authSlice.tsx";
import './menuStyle.css'

export const MenuComponent = () => {
    const [isAuth, setIsAuth] = useState(false);

    const {accessToken, refreshToken} = useAppSelector(({authSlice})=>authSlice);
    const dispatch = useAddDispatch();

    const user = localStorage.getItem('user');

    const handleLogOut = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (!user && !accessToken) {
            setIsAuth(false);
        } else {
            setIsAuth(true);
        }
    }, [user, accessToken, refreshToken]);

    return (
        <header>
            <div className={'container'}>{
                (isAuth) ?
                    (<ul className='menuList'>
                        <li className='menuItem'>
                            <Link className={'menuLink'} to={'/auth/users'}>users</Link>
                        </li>

                        <li className='menuItem'>
                            <Link className={'menuLink'} to={'/auth/recipes'}>recipes</Link>
                        </li>

                        {user ? (
                            <li className='menuItem userAuthLogo'>
                                <img className='img' src={JSON.parse(user).image} alt={JSON.parse(user).username}/>
                                <button className={'loginBtn'} onClick={handleLogOut}>Log Out</button>
                            </li>) : (

                            <li>
                                <Link to={'/login'}>login</Link>
                            </li>)}
                    </ul>) : (
                        <ul className='menuList'>
                            <li className='menuItem'>
                                <Link className={'menuLink'} to={'/login'}>login</Link>
                            </li>
                        </ul>)
            }</div>
        </header>
    );
};