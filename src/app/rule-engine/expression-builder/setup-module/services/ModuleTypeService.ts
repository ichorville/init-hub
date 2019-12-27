import {Injectable} from '@angular/core';
import {BaseService} from '../BaseService';
import { SetupModuleDTD } from './dtd/setup.dtd';
import {CsiHttpService} from "../../csi-web-base/csi-http-handler/csi-http.service";
import {API_URL} from "../../services/API_URL.const";

@Injectable()
export class ModuleTypeService extends BaseService<UIModule>{

  constructor(protected http: CsiHttpService) {
    super(http);//"http://localhost:10003/amd-masterdata/common/category/getAll"
    this.setURLPath(API_URL.MODULE_TYPES);
    // this.APIConfig = {};
  }

  public dummy(){
    return [
      {name:'module'},
      {name:'2module2'},
      {name:'3module33'},
      {name:'4module44'},
    ];
  }


}

export type UIModule = SetupModuleDTD;

// export interface UIModule {
//   id:number,
//   name:string;
//   code: string;
// }
