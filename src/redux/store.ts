import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        authSlice: authSlice.reducer,
        recipeSlice: recipeSlice.reducer,
    }
});