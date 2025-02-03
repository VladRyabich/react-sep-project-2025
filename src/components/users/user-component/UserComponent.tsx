import {Link} from "react-router-dom";
import {IUser} from "../../../models/IUser.ts";
import './userStyle.css';

type UserComponentProps = {
    user: IUser
};

export const UserComponent = ({user}: UserComponentProps) => {

    return (
        <li className='userItem'>
            <Link
                className='userLink'
                key={user.id}
                to={`${user.id}`}>

                <img src={user.image} alt={user.lastName}/>

                <h2>{user.id}. {user.firstName} {user.lastName}</h2>

                <p>Age: {user.age}</p>

            </Link>
        </li>
    );
};