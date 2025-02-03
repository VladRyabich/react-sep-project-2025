import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadAuthUser, loadAuthUsers, searchUsersByName} from "../services/api.service.ts";
import {IUser} from "../models/IUser.ts";

type UserSliceType = {
    users:IUser[];
    user: IUser | null;
    searchedUsers: IUser[];
}

const initialState: UserSliceType = {
    users:[],
    user: null,
    searchedUsers:[]
};

const loadUsers = createAsyncThunk(
    'userSlice/loadUsers',
    async (page: string, thunkAPI) => {
        try {
            const users = await loadAuthUsers(page);

            return thunkAPI.fulfillWithValue(users);
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue(e);
        }
    });

const loadUser = createAsyncThunk(
    'userSlice/loadUser',
    async (id: string, thunkAPI) => {
        try {
            const user = await loadAuthUser(id);

            return thunkAPI.fulfillWithValue(user);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(e);
        }
    });

const searchUsers = createAsyncThunk(
    'userSlice/searchUsers',
    async (query: string, thunkAPI) => {
        try {
            const users = await searchUsersByName(query);

            return thunkAPI.fulfillWithValue(users);
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue(e);
        }
    });


export const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.users = action.payload;
            })
            .addCase(loadUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
            })
            .addCase(searchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.searchedUsers = action.payload;
            })
});

export const userSliceActions ={
    ...userSlice.actions, loadUsers, loadUser, searchUsers
}