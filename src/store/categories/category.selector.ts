import { createSelector } from "reselect";

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state): CategoriesState => state.categories;
//이건 항상 실행됨. 여기서 categories array를 보고 변하지 않았다면 밑의 두 함수는 실행되지 않음

//memoize selector
export const selectCategories = createSelector(
  [selectCategoryReducer], //array가 든 {categories: Array(5)} 을 캐싱
  (categoriesSlice) => {
    return categoriesSlice.categories;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories], //array를 캐싱
  (categoriesArray): CategoryMap => {
    return categoriesArray.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap);
  }
);
//categoris array가 변하지 않는한 이 구문은 실행되지 않는다. 그냥 이전에 계산되어있던 값을 줘라

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
