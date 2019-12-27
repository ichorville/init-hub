import { Component, OnInit, Input } from '@angular/core';
import { FormGeneratorService } from '../../form-generator.service';

@Component({
  selector: 'app-grid-meta-data',
  templateUrl: './grid-meta-data.component.html',
  styleUrls: ['./grid-meta-data.component.css']
})
export class GridMetaDataComponent implements OnInit {
  @Input() currentIndex: number;
  constructor(
    public _fgs: FormGeneratorService
  ) { }

  ngOnInit() {
  }

  respawnFormMetaData() {
    this._fgs.refreshMetaDataUpdateSetter(true);
  }
}
