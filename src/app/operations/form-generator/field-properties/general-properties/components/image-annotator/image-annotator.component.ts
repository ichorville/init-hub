import { Component, OnInit, Input, ElementRef, ViewChild, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-annotator',
  templateUrl: './image-annotator.component.html',
  styleUrls: ['./image-annotator.component.css']
})
export class ImageAnnotatorComponent implements OnInit {

  @Input() widget:any;

  currentWidget:any;

  public _selectedImage: string;

  set selectedImage(value){
    this._selectedImage = atob(value);
    this.currentWidget?this.currentWidget.image = value:"";
  }

  get selectedImage(){
    return this._selectedImage;
  }

  @ViewChild("imageFileInput") imageFileInput: ElementRef;

  constructor() { }

  ngOnInit() {
    this.currentWidget = this.widget.controlContent;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
    if(changes["widget"]!=undefined || changes["widget"]!=null || changes["widget"]){
      this.currentWidget = this.widget.controlContent;;
      this.selectedImage = changes.widget.currentValue.controlContent.image;
    }
  }

  onImageButtonClicked(e) {
    this.imageFileInput.nativeElement.click();
  }

  onImageSelected(e) {
    // Convert image to Base64 
    console.log(e);
    this.convertToBase64(e);
  }

  // Image base64 convertions
  convertToBase64(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result.toString());
        // let encodeBase64String = btoa(reader.result.toString());
        this.selectedImage = btoa(reader.result.toString());
        // this.formGroup.get(this.formElement.label).setValue(reader.result.toString().trim());
      }
      reader.readAsDataURL(file);
    }
  }
}
