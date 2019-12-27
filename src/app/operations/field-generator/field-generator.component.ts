import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogUserService } from '@csi/csi-services-gateway';
import { FieldGeneratorService } from './field-generator.service';

@Component({
  selector: 'app-field-generator',
  templateUrl: './field-generator.component.html',
  styleUrls: ['./field-generator.component.css']
})
export class FieldGeneratorComponent implements OnInit {
  fieldList: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private logUserService: LogUserService,
    private _fgs: FieldGeneratorService,
  ) {
    this._fgs.addNotifyGetter().subscribe(res => {
      let configuration = {
        'hospitalGroupId': Number(this.logUserService.getUserHospitalGroupId()),
        'hospitalId': this.logUserService.getUserHospitalId() + '',
      };
      this._fgs.getFieldList(configuration).subscribe(res => {
        this.fieldList = res;
      });
    });
  }

  ngOnInit() {
    let configuration = {
      'hospitalGroupId': Number(this.logUserService.getUserHospitalGroupId()),
      'hospitalId': this.logUserService.getUserHospitalId() + '',
    };
    this._fgs.getFieldList(configuration).subscribe(res => {
      this.fieldList = res;
    });
    let param = this.route.snapshot.url[1];
    if (param != undefined) {
      // retireve current field from field-data-master params
      this.fieldList.filter(element => element.label === param)[0];
    }
  }

  editField(field) {
    console.log(field);
    this._fgs.editSetter(field);
  }

  remove(element) {
    this._fgs.deleteField(element.id).subscribe(res => {
      // update the field list if successful
      this._fgs.addNotifySetter(true);
    });
  }
}
