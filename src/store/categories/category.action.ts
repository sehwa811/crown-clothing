import { CATEGOREIS_ACTION_TYPES, Category } from "./category.types";

import createAction, {
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

export type FetchCategoriesStart =
  Action<CATEGOREIS_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FectchCategoriesSuccess = ActionWithPayload<
  CATEGOREIS_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCateogriesFailed = ActionWithPayload<
  CATEGOREIS_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

/* export type CategoryAction =
  | FetchCategoriesStart
  | FectchCategoriesSuccess
  | FetchCateogriesFailed; */

export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGOREIS_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSucess = withMatcher(
  (categoriesArray: Category[]): FectchCategoriesSuccess =>
    createAction(
      CATEGOREIS_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
);

export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCateogriesFailed =>
    createAction(CATEGOREIS_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);
