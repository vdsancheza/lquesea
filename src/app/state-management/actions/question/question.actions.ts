import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store'; 
import { Question } from '../../../models';

@Injectable()
export class QuestionActions {

  static LOAD_QUESTIONS = 'LOAD_QUESTIONS';
  static LOAD_QUESTIONS_SUCCESS = 'LOAD_QUESTIONS_SUCCESS';
  static ADD_QUESTION = 'ADD_QUESTION';
  static ADD_QUESTION_SUCCESS = 'ADD_QUESTION_SUCCESS';



  loadQuestions(): Action {
    console.log('ACTION:LOAD_QUESTIONS');
    return {
      type: QuestionActions.LOAD_QUESTIONS
    };
  }

  
  loadQuestionsSuccess(questions: Question[]): Action {
    console.log('ACTION: LOAD_QUESTIONS_SUCCESS');
    return {
      type: QuestionActions.LOAD_QUESTIONS_SUCCESS,
      payload: questions
    };
  }
  
  addQuestion(question: Question): Action {
    console.log('ACTION: ADD_QUESTION');
    return {
      type: QuestionActions.ADD_QUESTION,
      payload: question
    };
  }

  addQuestionSuccess(): Action {
    console.log('ACTION: ADD_QUESTION_SUCCESS');
    return {
      type: QuestionActions.ADD_QUESTION_SUCCESS,
      payload: null
    };
  }


}