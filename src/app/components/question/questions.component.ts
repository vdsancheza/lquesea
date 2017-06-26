import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question, Category } from '../../models';
import { QuestionService } from '../../services/question/question.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../../state-management/state/app.store';


@Component({
  selector: 'question-list',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  private questions: Question[];
  private sub: any;
  private questionsObs: Observable<Question[]>;
  private categoryDictObs: Observable<{[key: number]: Category}>;
  private categoryDictionary: {[key: number]: Category};
  private sub2: any;

  constructor(private store: Store<AppStore>) { 
    
    this.questionsObs = store.select(s => s.questions);
    this.categoryDictObs = store.select(s => s.categoryDictionary);
  }

  ngOnInit() {
    this.sub = this.questionsObs.subscribe(questions => this.questions = questions);
    this.sub2 = this.categoryDictObs.subscribe(cd => this.categoryDictionary = cd);

  }
  ngOnDestroy() {
    if (this.sub ) {
      this.sub.unsubscribe();
    }
  }

}
