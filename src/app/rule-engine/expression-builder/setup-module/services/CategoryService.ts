import {Injectable} from '@angular/core';
import {BaseService} from '../BaseService';
import {CsiHttpService} from "../../csi-web-base/csi-http-handler/csi-http.service";
import {API_URL} from "../../services/API_URL.const";

@Injectable()
export class CategoryService extends BaseService<UICategory>{

  constructor(protected http: CsiHttpService) {
    super(http);
    this.setURLPath(API_URL.CATEGORY);
  }

  public getByModule(module:number){
    return this.getAll(API_URL.CATEGORY.GET_BY_MODULE+"/"+module);
  }

}

export interface UICategory {
  id:number
  name: string;
  nameAlias: string;
  codeAlias: string;
  descriptionAlias: string;
  moduleId:number;
  isStringCode:boolean;
}
