/*
This class is for Http rapper using HTTP Client. Http Client has introduce the REST features.
CSI angular 5 module can use this module which will help to handle the http request by using
csi-http-handler.
*/
//Angular 5 imports
import 'rxjs/add/operator/map';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http'

// Injectable service
@Injectable()
export class CsiHttpService {

    //Action url
    private actionUrl: string;

    //Constructor with dependency injections
    constructor(private http: HttpClient) {

    }

    // get all List dependening on generic type
    public getAll<T>(requestUrl: string): Observable<T> {
        return this.http.get<T>(requestUrl);
    }

    // get List by Id dependening on generic type
    public getSingle<T>(requestUrl, id: number): Observable<T> {
        return this.http.get<T>(requestUrl + "/" + id);
    }

    // get List by Id dependening on generic type
    public getSingleItem<T>(requestUrl, id: number): Observable<T> {
      return this.http.get<T>(requestUrl + id);
    }

    // get Object by Id dependening on generic type
    public getSingleObject(requestUrl, id: number): Observable<any> {
        return this.http.get(requestUrl + "/" + id);
    }

    public getByText<T>(requestUrl, id: string): Observable<T> {
      return this.http.get<T>(requestUrl + "/" + id);
    }

    public search<T>(requestUrl, options:URLSearchParams): Observable<T> {
        return this.http.get<T>(requestUrl + "?"+options.toString());
    }

    // add data object
    public post<T>(requestUrl, item:any): Observable<T> {

        const toBeAdd = JSON.stringify(  item );
        return this.http.post<T>(requestUrl, toBeAdd,{headers: {'Content-Type': 'application/json'}});
    }

    // update data object
    public update<T>(requestUrl, id: number, itemToUpdate: any): Observable<T> {
        return this.http
            .put<T>(requestUrl+"/" + id, JSON.stringify(itemToUpdate));
    }


    // update data object without id
    public put<T>(requestUrl, itemToUpdate: any): Observable<T> {
        return this.http.put<T>(requestUrl, JSON.stringify(itemToUpdate),{headers: {'Content-Type': 'application/json'}});
    }

    // delete data object
    public delete<T>(requestUrl, id: number): Observable<T> {
        return this.http.delete<T>(requestUrl+"/" + id);
    }

}

//Header set class
@Injectable()
export class CsiHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // if (!req.headers.has('Content-Type')) {
          //  req = req.clone({ headers: req.headers.set('Accept', 'application/json')
         //   .set('Content-Type', 'application/x-www-form-urlencoded')
       // });
       // }
        // const tokenId = localStorage.getItem("tokenId");
        // const accetLanguage = localStorage.getItem("tokenId");
        // if(tokenId){
        //     const cloned = req.clone({
        //         headers:req.headers.set("Authorization","Bearer "+tokenId,)
        //         .set('Accept-Language', accetLanguage),
        //     });
        // }
        //req.headers.set('Accept', 'application/json') ;

        if (!req.headers.has('Access-Control-Allow-Origin')) {
        req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });
        }
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        // setting the accept header

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        return next.handle(req);
    }
}
