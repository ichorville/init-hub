import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';
import {CsiHttpService} from "../csi-web-base/csi-http-handler/csi-http.service";

export class BaseService<T>{

  // private GETALL:String;
  protected APIConfig:any = { GETALL:"/",ADD:"/"};

  constructor(protected http: CsiHttpService) {

  }

  setURLPath(path:{}){
    this.APIConfig = path;
    //APIConfig todo: mechanism to only change subset of api's paths --can we use array merge

  }

  getAll(url?:string): Observable<T []> {
    if(url){
      return this.http.getAll(url);
    }
    return this.http.getAll(this.APIConfig.GETALL);
  }

  // get List by Id dependening on generic type
  public getById<T>(id: number): Observable<T> {
    return this.http.getSingle<T>(this.APIConfig.GETBYID , id);
  }

  public post<T>(item:T): Observable<T> {
    return this.http.post(this.APIConfig.ADD,item);
  }
  public put<T>(item:T): Observable<T> {
    return this.http.put(this.APIConfig.PUT,item);
  }

  private handleErrorMessage(error: HttpErrorResponse): string {
    let msg = 'Unknown Service Error';
    try {
      if (error.status === 0) {
        msg = `Service failed. Please check the internet connection.`;
      } else {
        msg = `${error.status}: ${error.message || error.statusText}`;
      }
    } catch (e) {
      msg = '' + error;
    }

    return msg;
  }

  public dummy(){

  }

}
