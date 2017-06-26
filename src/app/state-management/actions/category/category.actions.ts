import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store'; 
import {Category} from '../../../models';

@Injectable()
export class CategoryActions {
 
 static LOAD_CATEGORIES = 'LOAD_CATEGORIES';
 static LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';

  loadCategories(): Action {
    console.log('ACTION:LOAD_CATEGORIES');
    return {
      type: CategoryActions.LOAD_CATEGORIES
    };
  }

  loadCategoriesSuccess(categories: Category[]): Action {
    console.log('ACTION: LOAD_CATEGORIES_SUCCESS');
    return {
      type: CategoryActions.LOAD_CATEGORIES_SUCCESS,
      payload: categories
    };
  }
}