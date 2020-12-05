/**
 * This service is for the data of the Groceries app
 */

import { Injectable } from '@angular/core';

/*needed for mongodb*/
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {
  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://192.168.1.104:8080"

  constructor(public http: HttpClient) {
    console.log('Hello GroceriesService Service');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
   }

  getItems(): Observable<object[]> {
    return <Observable<object[]>>this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData), catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    console.log(`Response is ::${res}`);
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error;
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return throwError(errMsg);
  }


  removeItem(item) {
    console.log("#### Remove Item - id=",item._id);
    this.http.delete(this.baseURL + "/api/groceries/"+item._id).subscribe(res =>{
      this.items=res;
      this.dataChangeSubject.next(true);
    });
  }




  addItem(item) {
    this.http.post(this.baseURL +"/api/groceries", item).subscribe(res=> {
      this.items=res;
      this.dataChangeSubject.next(true);
    });
    
  }

  editItem(item, index) {
    console.log("Editing item=", item, index);
    this.http.put(this.baseURL+"/api/groceries/" +index,item).subscribe(res => {
      this.items= <any> res;
      this.dataChangeSubject.next(true);
    });
  }

}
