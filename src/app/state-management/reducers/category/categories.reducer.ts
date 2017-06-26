import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store'; 
import { CategoryActions } from '../../actions';
import { Category } from '../../../models';

import '../../../rxjs-extensions';

export const CategoriesReducer = (state: any = [], action: Action): Category[] => {
  console.log('REDUCER: CategoriesReducer');
  switch (action.type) {
    case CategoryActions.LOAD_CATEGORIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const CategoryDictionaryReducer = (state: any = {}, action: Action): {[key: number]: Category} => {
  console.log('REDUCER: CategoryDictionaryReducer');
  switch (action.type) {
    case CategoryActions.LOAD_CATEGORIES_SUCCESS:
      let categories: Category[] = action.payload;
      let categoryDict: {[key: number]: Category} = {};
      categories.forEach(category => {
        categoryDict[category.id] = category;
      });
      return categoryDict;
    default:
      return state;
  }
};