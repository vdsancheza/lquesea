import { Category, Question} from '../../models';
import { CategoriesReducer, QuestionsReducer, QuestionSaveStatusReducer, TagsReducer, CategoryDictionaryReducer } from '../reducers';
import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

export interface AppStore {
  categories: Category[];
  questions: Question[];
  questionSaveStatus: string;
  tags: string[];
  categoryDictionary: {[key: number]: Category};
}
export default compose(combineReducers)({
    categories: CategoriesReducer,
    questions: QuestionsReducer,
    tags: TagsReducer,
    questionSaveStatus: QuestionSaveStatusReducer,
    categoryDictionary: CategoryDictionaryReducer
});