import createAction from "../../utils/reducer/reducer.utils";
import { CATEGOREIS_ACTION_TYPES } from "./category.types";

export const setCategories = (categoriesArray) =>
  createAction(CATEGOREIS_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
