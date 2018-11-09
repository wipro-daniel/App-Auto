import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchUrl = 'http://localhost:5000/';
  private searchUrlWeb = 'http://localhost:5000/';

  private _result: BehaviorSubject<any[]>;

  private dataStore: {
    searchResult: any[]
  };

  constructor(private _http: HttpClient) {
    this.dataStore = { searchResult: [] };
    this._result = new BehaviorSubject<any[]>([]);
  }

 
  get searchResult(): Observable<any[]> {
    return this._result.asObservable();
  }

  get postHcDataObs(): Observable<any[]> {
    return this._result.asObservable();
  }

  getSearchResults(searchString: string) {
    this._result = new BehaviorSubject<any[]>([]);

     //console.log(this.searchUrl+searchString);
    return this._http.get(this.searchUrl + searchString)

      .subscribe(data => {
        this.dataStore.searchResult = <any[]>data;
        this._result.next(Object.assign({}, this.dataStore).searchResult);
      }, error => {
    //pra    console.log('Failed to fetch results');
  //  console.log(error);
      });
  }

  postHcData(appName: string,hcParam:string,hcDesc:string,hcStat:string) {
    const uri='dbUpdate';
      // this._result = new BehaviorSubject<any[]>([]);
     //  console.log(this.searchUrl+searchString);
     const obj={
      appName:appName,
      hcParam:hcParam,
      hcDesc:hcDesc,
      hcStat:hcStat
     }
     console.log(obj);
      this._http.post(this.searchUrlWeb+uri,obj)
         .subscribe(res=>console.log(res),
        error=>{
          console.log(error);
        });  
  }

  postSprTkt(sprCde:string,sprStsCde:string){
    const uri='spriteUpdate';
    const obj={
      sprCde:sprCde,
      sprStsCde:sprStsCde
      }
     console.log(obj);
      this._http.post(this.searchUrlWeb+uri,obj)
         .subscribe(res=>console.log(res),
        error=>{
          console.log(error);
        });  

  }

}
