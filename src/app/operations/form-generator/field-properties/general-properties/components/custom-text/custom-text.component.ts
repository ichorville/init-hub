import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-text',
  templateUrl: './custom-text.component.html',
  styleUrls: ['./custom-text.component.css']
})
export class CustomTextComponent implements OnInit {

  @Input() widget:any;

  currentWidget:any;

  public editorInit:any = { 
    menubar: false,
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat '
  };

  public apiKey = "szx8dkb307331gcmuzj0kahkka30qmyq2ckwv0vy9tburboc";

  constructor() { }

  ngOnInit() {
    this.currentWidget = this.widget.controlContent;
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["widget"]) this.currentWidget = this.widget.controlContent;;
  }

}
