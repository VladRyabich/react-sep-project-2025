import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITokenPair} from "../models/ITokenPair.ts";
import {login, logOutApi, refresh} from "../services/api.service.ts";

type AuthSliceType = {
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthSliceType = {
    accessToken: null,
    refreshToken: null
};

const logIn = createAsyncThunk('authSlice/login',
    async ({username, password, expiresInMins}: {
        username: string;
        password: string;
        expiresInMins: number
    }, thunkAPI) => {
        try {
            const data = await login({username, password, expiresInMins});

            return thunkAPI.fulfillWithValue(data);
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue("Помилка авторизації");
        }
    });

const refreshTokens = createAsyncThunk('authSlice/refreshTokens',
    async (refreshToken: string, thunkAPI) => {
        try {
            const data = await refresh(refreshToken);

            return thunkAPI.fulfillWithValue(data);
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue("Помилка авторизації");
        }
    });

export const logout = createAsyncThunk("auth/logout", async () => {
    await logOutApi();
    return null;
});

export const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers:{},
    extraReducers: builder =>
        builder.addCase(logIn.fulfilled, (state, action: PayloadAction<ITokenPair>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        })
            .addCase(refreshTokens.fulfilled, (state, action: PayloadAction<ITokenPair>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            console.log(state.accessToken);
        })
            .addCase(logout.fulfilled, (state) => {
                state.accessToken = null;
                state.refreshToken = null;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
            })
});

export const authSliceActions = {
    ...authSlice.actions, logIn, refreshTokens
};