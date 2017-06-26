import { Component } from '@angular/core';
import { CategoryActions, QuestionActions, TagActions } from '../../state-management/actions';
import { AppStore } from '../../state-management/state/app.store';
import { Store } from '@ngrx/store';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RottenTCollector';
  sub: any;

  constructor(private categoryActions: CategoryActions,
              private questionActions: QuestionActions,
              private tagActions: TagActions,
              private store: Store<AppStore>,
              private router: Router,
              public snackBar: MdSnackBar
              ) {
      this.sub = store.select(s => s.questionSaveStatus)
                      .filter(status => status === "SUCCESS")
                      .subscribe(() => {
                        this.snackBar.open("Question saved!", "", {duration: 2000});
                        this.router.navigate(['/questions']);
                      });
  }
  ngOnInit () {
    //Dispatch para tags
    this.store.dispatch(this.tagActions.loadTags());

    //Dispatch para categories
    this.store.dispatch(this.categoryActions.loadCategories());

    //Dispatch para questions
    this.store.dispatch(this.questionActions.loadQuestions());
  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
  }

}
