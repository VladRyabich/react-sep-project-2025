import {IUser} from "./IUser.ts";

export type IUsersResponse = {
    total: number;
    skip: number;
    limit: number;
    users: IUser[];
}