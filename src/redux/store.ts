import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "../slices/userSlice.tsx";
import {authSlice} from "../slices/authSlice.tsx";
import {recipeSlice} from "../slices/recipeSlice.tsx";
import {useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        authSlice: authSlice.reducer,
        recipeSlice: recipeSlice.reducer,
    }
});

export const useAddDispatch =
    useDispatch.withTypes<typeof store.dispatch>();

export const useAppSelector =
    useSelector.withTypes<ReturnType<typeof store.getState>>();