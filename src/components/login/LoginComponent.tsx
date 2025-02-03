import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAddDispatch, useAppSelector} from "../../redux/store.ts";
import {useForm} from "react-hook-form";
import {ILoginDateType} from "../../models/ILoginDateType.ts";
import {authSliceActions} from "../../slices/authSlice.tsx";
import './loginStyle.css'

export const LoginComponent = () => {
    const navigate = useNavigate();

    const accessToken = useAppSelector(
        ({authSlice}) => authSlice.accessToken);

    const dispatch = useAddDispatch();

    const {register, handleSubmit} = useForm<ILoginDateType>();

    const handler = async ({username, password}: ILoginDateType) => {
        await dispatch(authSliceActions.logIn({username, password, expiresInMins: 30}));
    }

    useEffect(() => {
        if (accessToken) {
            navigate('/auth/users');
        }
    }, [accessToken]);

    return (
        <section className={'section'}>
            <div className={'container loginContainer'}>
                <h2 className={'loginTitle'}>Заповніть форму</h2>

                <form className={'loginForm'}
                      onSubmit={handleSubmit(handler)}>

                    <div>
                        <input
                            type="text"
                            placeholder="username"
                            {...register('username', {required: "error"})}/>
                    </div>

                    <div>
                        <input type="text"
                               placeholder="password"
                               {...register('password', {required: "error"})}/>
                    </div>

                    <button className={'loginBtn'}
                            type="submit">
                        Login
                    </button>
                </form>
            </div>
        </section>
    );
};