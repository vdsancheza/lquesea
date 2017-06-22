import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'category-list',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private categories: Category[];
  private sub: any; 

  constructor( private _categoryS: CategoryService) { }

  ngOnInit() {

    this.sub = this._categoryS.getCategories()
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
