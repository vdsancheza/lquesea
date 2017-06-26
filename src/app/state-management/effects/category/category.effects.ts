import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Category } from '../../../models';
import { CategoryService } from '../../../services';
import { CategoryActions } from '../../actions';

@Injectable()
export class CategoryEffects {

    constructor (
        private _actions$: Actions,
        private _categoryActions: CategoryActions,
        private _categoryS: CategoryService
    ) {}
    
    @Effect() 
    loadCategories$ = this._actions$
        .ofType(CategoryActions.LOAD_CATEGORIES)
        .switchMap(() => this._categoryS.getCategories())
        .map((categories: Category[]) => this._categoryActions.loadCategoriesSuccess(categories))
}