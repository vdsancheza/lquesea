import { Injectable } from '@angular/core';
import { Http , Response }	from '@angular/http';
import { Observable }	from 'rxjs/Rx';
import { environment }	from 'environments/environment';
import { Question } from '../../models/question';
import '../../rxjs-extensions';

@Injectable()
export class QuestionService {
  private url: string;

  constructor(private http: Http) { 

    this.url= environment.apiUrl + '/questions'
  }

  getQuestions() : Observable< Question[] > {
    let url = this.url;

    return this.http.get(url)
            .map(
              response => response.json()
            );
  }
}
