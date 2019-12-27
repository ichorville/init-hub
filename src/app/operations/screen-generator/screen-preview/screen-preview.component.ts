import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-screen-preview',
  templateUrl: './screen-preview.component.html',
  styleUrls: ['./screen-preview.component.css']
})
export class ScreenPreviewComponent implements OnInit {
  previewMode: boolean = true;
  
  constructor(
    public dialogRef: MatDialogRef<ScreenPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any
  ) { 
    console.log(this.formData)
  }

  ngOnInit() {

  }
}
