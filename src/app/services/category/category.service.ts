import { Injectable } from '@angular/core';
import { Http }	from '@angular/http';
import { Observable }	from 'rxjs/Rx';
import { environment }	from 'environments/environment';
import { Category } from '../../models/category';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import '../../rxjs-extensions';

@Injectable()
export class CategoryService {
	private url: string;

  constructor(private _angularFDB: AngularFireDatabase) { 

  	this.url = '/categories'
  }

  getCategories() : Observable< Category[] > {
    let url = this.url;
    console.log("SERVICE: getCategories");
    return this._angularFDB.list(url);
  }

}
