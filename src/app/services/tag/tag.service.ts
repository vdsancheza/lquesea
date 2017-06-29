import { Injectable } from '@angular/core';
import { Http }	from '@angular/http';
import { Observable }	from 'rxjs/Rx';
import { environment }	from 'environments/environment';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import '../../rxjs-extensions';

@Injectable()
export class TagService {
	private url: string;

  constructor(private _angularFDB: AngularFireDatabase) { 

  	this.url = '/tagList'
  }

  getTags() : Observable< string[] > {
    let url = this.url;
    console.log("SERVICE: getTags");
    return this._angularFDB.list(url)
                            .map(
                              t => t.map(a => a["$value"])
                              );
  }

}
