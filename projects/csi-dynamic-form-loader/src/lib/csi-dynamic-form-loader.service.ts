import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { FormLoaderModelComponent } from './form-loader-model/form-loader-model.component';
import { ApiContext } from './shared/models/form-loader-api-context';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CsiDynamicFormLoaderService {
  public SERVER;
  constructor(
    @Inject('CSI_DYNAMIC_FORM_LOADER_CONFIG') private loaderConfig,
    private http: HttpClient,
    private modelService: BsModalService
  ) {
    this.SERVER = loaderConfig.SERVER;
  }

  public getFormData(id: string, contextData?: ApiContext): Observable<any> {
    const URL = `${this.SERVER}/csi-personalization-service/form-builder/fetch-data`;
    const postObj = {
      formID: id,
      patientId: contextData.patientId,
      pomrID: contextData.pomrId
    };
    return this.http.post(URL, postObj);
  }

  public getFormById(id: string, contextData?: any): Observable<any> {
    const URL = `${this.SERVER}/csi-personalization-service/personalisation/custom-form/findById/${id}`;
    return this.http.get(URL);
  }

  // load form through loader component
  public loadForm(formId: string, apiContext: ApiContext) {
    const initialState = {
      formId: formId,
      apiContext: apiContext
    };
    this.modelService.show(FormLoaderModelComponent, {
      initialState,
      class: "form-loader-model model-lg"
    });
  }
}
