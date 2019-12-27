import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  @Input() widget:any;

  currentWidget:any;

  constructor() { }

  ngOnInit() {
    this.currentWidget = this.widget.controlContent;
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["widget"]) this.currentWidget = this.widget.controlContent;;
  }

  validateInput(event) {
    if (event.keyCode == 69 || event.keyCode == 189 || event.keyCode == 187 || event.keyCode == 190) {
      event.preventDefault();
    }
  }
}
