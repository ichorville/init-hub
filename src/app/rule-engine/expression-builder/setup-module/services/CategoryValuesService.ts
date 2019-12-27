import {Injectable} from '@angular/core';
import {BaseService} from '../BaseService';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs';
import {UICategory} from './CategoryService';
import {CsiHttpService} from "../../csi-web-base/csi-http-handler/csi-http.service";
import {API_URL} from "../../services/API_URL.const";


@Injectable()
export class CategoryValuesService extends BaseService<UICategoryValue>{

  constructor(protected http: CsiHttpService) {
    super(http);
    this.setURLPath(API_URL.CATEGORY_VALUES);
  }



  getByCategory(id: number):Observable<UICategoryValue[]> {
    return this.getAll(API_URL.CATEGORY_VALUES.GET_BY_CATEGORY+"/"+id);
  }

  validate(obj:UICategoryValue,cat:UICategory){
    if(cat.isStringCode===false){
      if(!Number(obj.code)){
        return false
      }
    }
    if(obj.code && obj.name && obj.description ){
      return true
    }
    return false;
  }
}

export interface UICategoryValue {
  id:number,
  code: string;
  name: string;
  nameAlias: string;
  description: string;
  descriptionAlias: string;
  categoryId:number,
  languageCode:string,
  alias: string;
  isActive: boolean;
  isBuiltin: boolean;
  translationValues: any;

}
