import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FormGeneratorService } from 'src/app/operations/form-generator/form-generator.service';
import * as RESOURCE from '../../../../../shared/constants/resources';
import { LogUserService } from '@csi/csi-services-gateway';

@Component({
  selector: 'app-resource-bindings',
  templateUrl: './resource-bindings.component.html',
  styleUrls: ['./resource-bindings.component.css']
})
export class ResourceBindingsComponent implements OnInit {

  @Output() onSelected:EventEmitter<any> = new EventEmitter();

  referanceTypes: any[] = [
    { value: 'formField', viewValue: 'Existing Form Field' },
    { value: 'apiBinding', viewValue: 'Existing Api' },
  ];

  public selectedResourceType:string;
  public showApiDropdown:boolean;
  public asyncSelected;

  public dataSource;
  public apiBindingSource:any[];
  public selectedApiBinding;

  constructor(
    private _formgs:FormGeneratorService, 
    private logUserService:LogUserService) { }

  ngOnInit() {
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    })
    .pipe(
      mergeMap((token: string) => this.getStatesAsObservable(token))
    );
  
    this.apiBindingSource = RESOURCE.API_BINDINGS;
  }

  getStatesAsObservable(token: string): Observable<any> {
    const query = new RegExp(token, 'i');

    return this.getFormData(token);

  }

  typeaheadOnSelect(event) {
    this.selectedApiBinding = event.item;
    this.onSelected.emit(this.selectedApiBinding);
  }

  getFormData(searchTerm): Observable<any> {
    let configuration = {
      'hospitalGroupId': Number(this.logUserService.getUserHospitalGroupId()),
      'hospitalId': this.logUserService.getUserHospitalId() + '',
      "category": this._formgs.formCategory,
    };
    configuration['searchTerm'] = searchTerm;

    return new Observable(obs => {

      this._formgs.getFieldForms(configuration).subscribe(temObj => {

        obs.next(temObj);
        obs.complete();

      }, error => {
        obs.error(error);
        obs.complete();
      });
    });
  }

  onResourceChange(event) {
    if (event.value === 'formField') {
      this.showApiDropdown = true;
    } else {
      this.showApiDropdown = false;
    }
  }

}
