import { Component, OnInit, Input } from '@angular/core';
import { FormGeneratorService } from '../../form-generator.service';

@Component({
  selector: 'app-tab-meta-data',
  templateUrl: './tab-meta-data.component.html',
  styleUrls: ['./tab-meta-data.component.css']
})
export class TabMetaDataComponent implements OnInit {
  @Input() currentIndex: number;
  tabs: any[] = [];
  constructor(
    private _fgs: FormGeneratorService
  ) { }

  ngOnInit() {
  }

  add() {
    this.tabs.push({

    })
  }

  remove() {
    this.tabs.pop();
  }
}
