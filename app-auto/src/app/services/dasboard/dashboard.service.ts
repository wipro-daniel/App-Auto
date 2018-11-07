import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  filePath = 'api/tickets/hcData.JSON';
  private graphStr='ahcDb';
  private graphAhc='http://localhost:5000/ahcDb';

  constructor(private http: HttpClient) { }

  getResults(): Observable<any> {
   // console.log('In Dashboard Service');
   //console.log(this.graphAhc);
    return this.http.get(this.graphAhc).pipe(
      tap (data => console.log(JSON.stringify(<any>data)))
    );
  }
}
