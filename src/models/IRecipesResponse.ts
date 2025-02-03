import {IRecipe} from "./IRecipe.ts";

export type IRecipesResponse = {
    total: number;
    skip: number;
    limit: number;
    recipes: IRecipe[];
}