import { Observable } from 'rxjs/Observable';
import { Action} from '@ngrx/store';
import { QuestionActions } from '../../actions';
import { Question } from '../../../models';

import '../../../rxjs-extensions';

export const QuestionsReducer = (state: any = [], action: Action): Question[] => {
  console.log('REDUCER: QuestionsReducer');
  switch (action.type) {
    case QuestionActions.LOAD_QUESTIONS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const QuestionSaveStatusReducer = (state: any = "NONE", action: Action): string => {
  console.log('REDUCER: QuestionSaveStatusReducer');
  switch (action.type) {
    case QuestionActions.ADD_QUESTION:
      return "IN PROGRESS";
    case QuestionActions.ADD_QUESTION_SUCCESS:
      return "SUCCESS";
    default:
      return state;
  }
};