import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-advance-properties',
  templateUrl: './advance-properties.component.html',
  styleUrls: ['./advance-properties.component.css']
})
export class AdvancePropertiesComponent implements OnInit {

  @Input() widget:any;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.widget)
  }
}
