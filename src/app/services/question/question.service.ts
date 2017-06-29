import { Injectable } from '@angular/core';
import { Http , Response }	from '@angular/http';
import { Observable }	from 'rxjs/Rx';
import { Question } from '../../models/question';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { QuestionActions } from '../../state-management/actions';
import { AppStore } from '../../state-management/state/app.store';
import { Store } from '@ngrx/store';
import '../../rxjs-extensions';

@Injectable()
export class QuestionService {
  private url: string;

  constructor(private _angularFDB: AngularFireDatabase, 
              private _questionAct: QuestionActions, 
              private _appStore: Store<AppStore>) { 

    this.url=  '/questions'
  }

  getQuestions(): Observable<Question[]> {
      let url = this.url;
      console.log('SERVICE: getQuestions');
      return this._angularFDB.list(url);
  }

  saveQuestion(question: Question) {
      console.log('SERVICE: saveQuestion');
      let url = this.url;
       this._angularFDB.list(url)
        .push(question)
        .then(
          (success) => {
            this._appStore.dispatch(this._questionAct.addQuestionSuccess());
          },
          (error: Error) => {
              console.log(error);
          }

        );
  }

}
