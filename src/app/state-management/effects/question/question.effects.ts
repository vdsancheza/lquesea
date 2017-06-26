import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Question } from '../../../models';
import { QuestionService } from '../../../services';
import { QuestionActions } from '../../actions';

@Injectable()
export class QuestionEffects {

    constructor (
        private _actions$: Actions,
        private _questionActions: QuestionActions,
        private _questionS: QuestionService
    ) {}
    
    @Effect() 
    loadQuestions$ = this._actions$
        .ofType(QuestionActions.LOAD_QUESTIONS)
        .switchMap(() => this._questionS.getQuestions())
        .map((questions: Question[]) => this._questionActions.loadQuestionsSuccess(questions));

    @Effect() 
    addQuestion$ = this._actions$
        .ofType(QuestionActions.ADD_QUESTION)
        .switchMap((action) => this._questionS.saveQuestion(action.payload))
        .map((question: Question) => this._questionActions.addQuestionSuccess(question));
}