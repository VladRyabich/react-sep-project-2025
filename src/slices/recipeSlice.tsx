import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    getRecipesByTag,
    loadAllAuthRecipes,
    loadAuthRecipe,
    loadAuthRecipes,
    searchRecipesById
} from "../services/api.service.ts";
import {IRecipe} from "../models/IRecipe.ts";

type RecipeSliceType = {
    recipes: IRecipe[];
    recipe: IRecipe | null;
    recipesByTag: IRecipe[];
    searchedRecipes: IRecipe[];
};

const initialState: RecipeSliceType = {
    recipes:[],
    recipe: null,
    recipesByTag: [],
    searchedRecipes: []
};

const loadPaginatedRecipes = createAsyncThunk(
    'recipeSlice/loadRecipes',
    async (page:string, thunkAPI)=>{
        try {
            const recipes = await loadAuthRecipes(page);

            return thunkAPI.fulfillWithValue(recipes);
        } catch (e){
            console.log(e)
            return thunkAPI.rejectWithValue("e");
        }
    }
);

const loadRecipe = createAsyncThunk(
    'recipeSlice/loadRecipe',
    async (id: string, thunkAPI) => {
        try {
            const user = await loadAuthRecipe(id);

            return thunkAPI.fulfillWithValue(user);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue("e");
        }
    }
);

const loadAllRecipes = createAsyncThunk(
    'recipeSlice/loadAllRecipes',
    async (_, thunkAPI)=>{
        try {
            const recipes = await loadAllAuthRecipes();

            return thunkAPI.fulfillWithValue(recipes);
        } catch (e){
            console.log(e);
            return thunkAPI.rejectWithValue("e");
        }
    }
);

const loadRecipesByTag = createAsyncThunk(
    'recipeSlice/loadRecipesByTag',
    async (tag: string, thunkAPI)=>{
        try {
            const recipes = await getRecipesByTag(tag);

            return thunkAPI.fulfillWithValue(recipes);
        } catch (e){
            console.log(e);
            return thunkAPI.rejectWithValue("e");
        }
    }

);

const searchRecipes = createAsyncThunk(
    'recipeSlice/searchRecipes',
    async (query: string, thunkAPI) => {
        try {
            const recipes = await searchRecipesById(query);

            return thunkAPI.fulfillWithValue(recipes);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue("e");
        }
    }
);

export const recipeSlice = createSlice({
    name: "recipeSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => builder
        .addCase(loadPaginatedRecipes.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
            state.recipes = action.payload;
            console.log(action.payload);
        })
        .addCase(loadRecipe.fulfilled, (state, action: PayloadAction<IRecipe>) => {
            state.recipe = action.payload;
            console.log(action.payload);
        })
        .addCase(loadAllRecipes.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
            state.recipes = action.payload;
            console.log(action.payload);
        })
        .addCase(loadRecipesByTag.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
            state.recipesByTag = action.payload;
            console.log(action.payload);
        })
        .addCase(searchRecipes.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
            state.searchedRecipes = action.payload;
            console.log(action.payload);
        })
});

export const recipeSliceActions = {
    ...recipeSlice.actions,
    loadPaginatedRecipes,
    loadRecipe,
    loadAllRecipes,
    loadRecipesByTag,
    searchRecipes
};