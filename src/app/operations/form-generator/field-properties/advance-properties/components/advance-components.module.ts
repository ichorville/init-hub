import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponent } from './common/common.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { FormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area/text-area.component';
import { ColorComponent } from './color/color.component';
import { DateComponent } from './date/date.component';
import { EmailComponent } from './email/email.component';
import { ImageComponent } from './image/image.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageAnnotatorComponent } from './image-annotator/image-annotator.component';
import { NumberComponent } from './number/number.component';
import { PasswordComponent } from './password/password.component';
import { RangeComponent } from './range/range.component';
import { TimeComponent } from './time/time.component';
import { UrlComponent } from './url/url.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { TabularEntryComponent } from './tabular-entry/tabular-entry.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { CustomTextComponent } from './custom-text/custom-text.component';
import { FormLogoComponent } from './form-logo/form-logo.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [
    CommonComponent,
    TextBoxComponent,
    TextAreaComponent,
    ColorComponent,
    DateComponent,
    EmailComponent,
    ImageComponent,
    ImageUploadComponent,
    ImageAnnotatorComponent,
    NumberComponent,
    PasswordComponent,
    RangeComponent,
    TimeComponent,
    UrlComponent,
    TextEditorComponent,
    TabularEntryComponent,
    CheckboxComponent,
    RadioComponent,
    CustomTextComponent,
    FormLogoComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule
  ],
  exports: [
    CommonComponent,
    TextBoxComponent,
    TextAreaComponent,
    ColorComponent,
    DateComponent,
    EmailComponent,
    ImageComponent,
    ImageUploadComponent,
    ImageAnnotatorComponent,
    NumberComponent,
    PasswordComponent,
    RangeComponent,
    TimeComponent,
    UrlComponent,
    TextEditorComponent,
    TabularEntryComponent,
    CheckboxComponent,
    RadioComponent,
    CustomTextComponent,
    FormLogoComponent,
    DropdownComponent
  ]
})
export class AdvanceComponentsModule { }
