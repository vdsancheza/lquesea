import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class TagActions {

  static LOAD_TAGS = 'LOAD_TAGS';
  static LOAD_TAGS_SUCCESS = 'LOAD_TAGS_SUCCESS';
  
  loadTags(): Action {
    console.log('ACTION: LOAD_TAGS');
    return {
      type: TagActions.LOAD_TAGS
    };
  }

  loadTagsSuccess(tags: string[]): Action {
    console.log('LOAD_TAGS_SUCCESS');
    return {
      type: TagActions.LOAD_TAGS_SUCCESS,
      payload: tags
    };
  }

}