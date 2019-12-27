import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FieldAddServiceService {

  constructor(private http: HttpClient) {
  }

  public getEndPointDefinitions(service) {
    return this.http.get(service);
  }
}
