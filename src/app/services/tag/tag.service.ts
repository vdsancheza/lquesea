import { Injectable } from '@angular/core';
import { Http }	from '@angular/http';
import { Observable }	from 'rxjs/Rx';
import { environment }	from 'environments/environment';
import '../../rxjs-extensions';

@Injectable()
export class TagService {
	private url: string;

  constructor(private http: Http) { 

  	this.url = environment.apiUrl + '/tagList'
  }

  getTags() : Observable< string[] > {
    let url = this.url;
    console.log("SERVICE: getTags");
    return this.http.get(url)
            .map(
              response => response.json()
              );
  }

}
