import { Injectable } from '@angular/core';
import { Http }	from '@angular/http';
import { Observable }	from 'rxjs/Rx';
import { environment }	from 'environments/environment';
import { Category } from '../../models/category';
import '../../rxjs-extensions';

@Injectable()
export class CategoryService {
	private url: string;

  constructor(private http: Http) { 

  	this.url = environment.apiUrl + '/categories'
  }

  getCategories() : Observable< Category[] > {
    let url = this.url;
    console.log("SERVICE: getCategories");
    return this.http.get(url)
            .map(
              response => response.json()
              );
  }

}
