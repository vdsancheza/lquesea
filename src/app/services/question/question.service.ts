import { Injectable } from '@angular/core';
import { Http , Response }	from '@angular/http';
import { Observable }	from 'rxjs/Rx';
import { environment }	from 'environments/environment';
import { Question } from '../../models/question';
import { CategoryService } from '../category/category.service';
import { Category } from '../../models/category';
import '../../rxjs-extensions';

@Injectable()
export class QuestionService {
  private url: string;

  constructor(private http: Http, private _categoryS: CategoryService) { 

    this.url= environment.apiUrl + '/questions'
  }

  getQuestions(): Observable<Question[]> {
      let url = this.url;
      console.log('SERVICE: getQuestions');
      return this.http.get(url)
               .map(
                 res => res.json() 
                 );
  }

  saveQuestion(question: Question): Observable<Question> {
      console.log('SERVICE: saveQuestion');
      let url = this.url;
      return this.http.post(url, question)
                      .map(
                        res => res.json()
                      );
  }

}
