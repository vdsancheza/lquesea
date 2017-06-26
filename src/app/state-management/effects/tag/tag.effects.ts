import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';


import { TagActions } from '../../actions';
import { TagService } from '../../../services'

@Injectable()
export class TagEffects {
    constructor (
        private _actions$: Actions,
        private _tagActions: TagActions,
        private _tagS: TagService
    ) {}

    @Effect() 
    loadTags$ = this._actions$
        .ofType(TagActions.LOAD_TAGS)
        .switchMap(() => this._tagS.getTags())
        .map((tags: string[]) => this._tagActions.loadTagsSuccess(tags))

}