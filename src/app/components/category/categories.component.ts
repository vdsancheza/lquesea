import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../../state-management/state/app.store';

@Component({
  selector: 'category-list',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  private categoriesObs: Observable<Category[]>;
  private categories: Category[];
  private sub: any; 

  constructor( private store: Store<AppStore>) { 
    this.categoriesObs = store.select(s => s.categories);
  }

  ngOnInit() {

    this.sub = this.categoriesObs
               .subscribe(
                 categories => {
                   this.categories = categories; 
                   console.log(this.categories);
                }
               );

  }
  ngOnDestroy(){
    if (this.sub ) {
      this.sub.unsubscribe();
    }
  }
}
