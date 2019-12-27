import { Component, OnInit, Input, ElementRef, ViewChild, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @Input() widget:any;

  currentWidget:any;

  // For image annotator and form logo
  public imageUrl:string;

  public _selectedImage: string;

  set selectedImage(value){
    this._selectedImage = value?atob(value):undefined;
    this.currentWidget?this.currentWidget.image = value:"";
  }

  get selectedImage(){
    return this._selectedImage;
  }

  @ViewChild("imageFileInput") imageFileInput: ElementRef;
  public imageUploadType: string = "UPLOAD";
  
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

  onImageSelected(e) {
    // Convert image to Base64 
    this.convertToBase64(e);
  }
  
  onImageButtonClicked(e) {
    this.imageFileInput.nativeElement.click();
  }

  // Image base64 convertions
  convertToBase64(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // let encodeBase64String = btoa(reader.result.toString());
        this.selectedImage = btoa(reader.result.toString());
        // this.formGroup.get(this.formElement.label).setValue(reader.result.toString().trim());
      }
      reader.readAsDataURL(file);
    }
  }

  onImageUploadTypeChanged(e) {
    this.selectedImage = undefined;
    this.currentWidget.image = "";
    this.currentWidget.imageUrl = "";

    this.imageUploadType = e.value;
  }
}
