import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { TagActions } from '../../actions';

import '../../../rxjs-extensions';

export const TagsReducer = (state: any = [], action: Action): string[] => {
  console.log('REDUCER: TagsReducer');
  switch (action.type) {
    case TagActions.LOAD_TAGS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};