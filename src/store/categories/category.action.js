import createAction from "../../utils/reducer/reducer.utils";
import { CATEGOREIS_ACTION_TYPES } from "./category.types";

/* export const setCategories = (categoriesArray) =>
  createAction(CATEGOREIS_ACTION_TYPES.SET_CATEGORIES, categoriesArray); */

export const fetchCategoriesStart = () =>
  createAction(CATEGOREIS_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSucess = (categoriesArray) =>
  createAction(
    CATEGOREIS_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGOREIS_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

