import axios from "axios";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {IRecipe} from "../models/IRecipe.ts";
import {IRecipesResponse} from "../models/IRecipesResponse.ts";
import {retriveLocalStorage} from "./helpers.ts";
import {ITokenPair} from "../models/ITokenPair.ts";
import {ILoginDateType} from "../models/ILoginDateType.ts"
import {IUsersResponse} from "../models/IUsersResponse.ts";
import {IUser} from "../models/IUser.ts";

const baseUrl = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl + '/auth',
    headers: {"Content-Type": "application/json"}
});

axiosInstance.interceptors.request.use((request) => {
    if (request.method?.toUpperCase() === 'GET') {
        request.headers.Authorization =
            'Bearer ' + retriveLocalStorage<IUserWithTokens>('user').accessToken;
    }

    return request;
});


export const login =
    async ({username, password, expiresInMins}: ILoginDateType): Promise<IUserWithTokens> => {
        const {data: userWithTokens} = await axiosInstance.post<IUserWithTokens>('/login', {
            username,
            password,
            expiresInMins
        });
        localStorage.setItem('user', JSON.stringify(userWithTokens));

        return userWithTokens;
    };

export const loadAuthRecipes =
    async (page: string): Promise<IRecipe[]> => {
        if (+page < 0) {

            const {data: {recipes}} = await axiosInstance.get<IRecipesResponse>('/recipes' + '?limit=' + 10);
            return recipes;
        }
        const limit: number = 10;
        const skip: number = limit * (+page) - limit;
        const {data: {recipes}} = await axiosInstance.get('/recipes' + '?limit=' + limit + '&skip=' + skip);

        return recipes;
    };

export const loadAllAuthRecipes = async (): Promise<IRecipe[]> => {
    const {data: {recipes}} = await axiosInstance.get<IRecipesResponse>('/recipes' + '?limit=' + 50);

    return recipes;
};

export const loadAuthUsers = async (page: string): Promise<IUser[]> => {
    if (+page < 0) {
        const {data: {users}} = await axiosInstance.get<IUsersResponse>('/users');
        return users;
    }
    const limit: number = 30;
    const skip: number = limit * (+page) - limit;
    const {data: {users}} = await axiosInstance.get('/users' + '?skip=' + skip);

    return users;
};

export const loadAuthUser = async (id: string): Promise<IUser> => {
    const {data} = await axiosInstance.get<IUser>(`/users/${id}`);

    return data;
};

export const loadAuthRecipe = async (id: string): Promise<IRecipe> => {
    const {data} = await axiosInstance.get<IRecipe>(`/recipes/${id}`);

    return data;
};

export const refresh = async (refresh: string): Promise<ITokenPair> => {
    const iUserWithTokens = retriveLocalStorage<IUserWithTokens>('user');
    const {data: {accessToken, refreshToken}} = await axiosInstance.post<ITokenPair>('/refresh', {
        refreshToken: refresh,
        expiresInMins: 10
    });
    iUserWithTokens.accessToken = accessToken;
    iUserWithTokens.refreshToken = refreshToken;
    localStorage.setItem('user', JSON.stringify(iUserWithTokens));

    return iUserWithTokens;
};

export const logOutApi = async (): Promise<void> => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export const getRecipesByTag = async (tag: string): Promise<IRecipe[]> => {
    const {data: {recipes}} = await axiosInstance.get<IRecipesResponse>('/recipes/tag/' + tag);

    return recipes;
};

export const searchUsersByName = async (query: string): Promise<IUser[]> => {
    if (!isNaN(Number(query)) && (Number(query) > 0) && (Number(query) <= 208)) {
        const user = await loadAuthUser(query);

        return [user];
    } else {
        const {data: {users}} = await axiosInstance.get<IUsersResponse>(`/users/search?q=${query}`);

        return users;
    }
};

export const searchRecipesById = async (query: string): Promise<IRecipe[]> => {
    if (!isNaN(Number(query)) && (Number(query) > 0) && (Number(query) <= 50)) {
        const recipe = await loadAuthRecipe(query);

        return [recipe];
    } else {
        const {data: {recipes}} = await axiosInstance.get<IRecipesResponse>(`/recipe/search?q=${query}`);

        return recipes;
    }
};