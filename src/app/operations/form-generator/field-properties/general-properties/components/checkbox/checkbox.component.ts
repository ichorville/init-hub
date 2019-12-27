import { Component, OnInit, Input, ViewChild, TemplateRef, SimpleChanges } from '@angular/core';
import { CsiToastsService } from '@csi/csi-toastr';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() widget:any;

  @ViewChild("resourceModal") resourceModal:TemplateRef<BsModalRef>;
  public modalRef:BsModalRef;

  currentWidget:any;

  optionLabel:string;
  optionValue:string;
  enableOptionTextbox:boolean = false;
  optionTextboxLabel:string;
  previousLabel:string;
  previousValue:string;
  isEdit:boolean;
  optionList:any[] = [];

  isBindApiResource:boolean;
  public optionResourcePayload:any;

  constructor(private toastr:CsiToastsService, private modalService:BsModalService) { }

  ngOnInit() {
    this.currentWidget = this.widget.controlContent;
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["widget"]) this.currentWidget = this.widget.controlContent;;
  }
  
    /**
   * applicable to radio/ checkbox/ select fields where this functionality controls
   * the behaviour of manually added options of the particular item lisy
   */
  addMoreOptions() {
    if (this.optionLabel == undefined || this.optionValue == undefined ||
      this.optionLabel.trim() == '' || this.optionValue.trim() == '') {
      this.displayToast('Label & Value is Mandatory', 'warning');
    } else {
      if (this.isEdit == true) {
        // this is an edit scenario
        if (this.checkForDuplicates(this.optionLabel, this.optionValue, true) == true) {
          this.displayToast('Duplicate Option Pair Available', 'Warning');
        } else {
          this.optionList.forEach(element => {
            if (element['label'] == this.previousLabel) {
              element['label'] = this.optionLabel;
              element['value'] = this.optionValue;

              // Adding textbox with options feature currenty limited to radio button controls
              element['enableOptionTextbox'] = this.enableOptionTextbox;
              element['optionTextboxLabel'] = this.optionTextboxLabel

            }
          });
          this.previousLabel = undefined;
          this.previousValue = undefined;
          this.optionLabel = undefined;
          this.optionValue = undefined;
          this.enableOptionTextbox = false;
          this.optionTextboxLabel = undefined;
          this.isEdit = false;
        }
      } else {
        // add scenario
        if (this.checkForDuplicates(this.optionLabel, this.optionValue) == true) {
          this.displayToast('Duplicate Option Pair Available', 'Warning');
        } else {

          // Adding textbox with options feature currenty limited to radio button controls
            this.optionList.push({
              label: this.optionLabel,
              value: this.optionValue,
              enableOptionTextbox: this.enableOptionTextbox,
              optionTextboxLabel: this.optionTextboxLabel
            });

          this.optionLabel = undefined;
          this.optionValue = undefined;
          this.enableOptionTextbox = false;
          this.optionTextboxLabel = undefined;
        }
      }
    }

    // Set option list when each option added
    this.currentWidget.options = this.optionList;

    console.log(this.currentWidget)
  }

  /**
   * For manually entered option values, to avoid frm adding furthermore
   * duplicate values to the option list
   * @param value1
   * @param value2
   * @param param
   */
  checkForDuplicates(value1, value2, param?) {
    if (param) {
      let result = false;
      if (value1 == this.previousLabel && value2 == this.previousValue) {
        result = false;
      } else {
        this.optionList.forEach(element => {
          if (element['label'] == value1 || element['value'] == value2) {
            result = true;
          }
        });
      }
      return result;
    } else {
      let result = false;
      this.optionList.forEach(element => {
        if (element['label'] == value1 || element['value'] == value2) {
          result = true;
        }
      });
      return result;
    }
  }

  /**
   * Display toaster message
   * @param message
   * @param type
   */
  displayToast(message, type) {
    this.toastr.warning(message, type, {
      timeOut: 3000,
      progressBar: true,
      closeButton: true
    });
  }

  onBindingOptionChanged(){
    console.log(this.isBindApiResource)
    if(this.isBindApiResource){
      this.modalRef = this.modalService.show(this.resourceModal,{
        class: "modal-lg"
      });
    }else{
      this.optionResourcePayload = undefined;
      this.currentWidget.selectedResource = undefined;
      this.currentWidget.urlEndpoint = false;
      this.currentWidget.apiEndpoint = undefined;
      this.currentWidget.displayProperty = undefined;
      this.currentWidget.valueProperty = undefined
      this.currentWidget.options = [];
    }
  }

  onResourceChanged(event){
    console.log(event);
    this.currentWidget.urlEndpoint = true;
    this.currentWidget.apiEndpoint = event.apiEndpoint;
    this.currentWidget.selectedResource = event.resourceType;
  } 

  onDisplayChanged(event){
    console.log(event);
    this.currentWidget.displayProperty = event.value;
  }

  onValueChanged(event){
    console.log(event);
    this.currentWidget.valueProperty = event.value;
    console.log(this.currentWidget);
  }

  /**
   * Edit options of select/ radio/ checkbox options list
   * @param value
   */
  editOption(value) {
    this.optionList.forEach(element => {
      if (value.label == element['label']) {
        this.isEdit = true;
        this.previousLabel = value.label;
        this.previousValue = value.value;
        this.optionLabel = element['label'];
        this.optionValue = element['value'];

        // Adding textbox with options feature currenty limited to radio button controls
        this.enableOptionTextbox = element['enableOptionTextbox'];
        this.optionTextboxLabel = element['optionTextboxLabel'];
      }
    });
  }

  /**
   * Removal of options from select/ radio/ checkbox option list
   * @param value
   */
  removeOption(value) {
    this.optionList.forEach((element, index) => {
      if (value.label == element['label']) {
        this.optionList.splice(index, 1);
      }
    });

    this.optionLabel = undefined;
    this.optionValue = undefined;
    this.enableOptionTextbox = false;
    this.optionTextboxLabel = undefined;
  }

  showOptionResourceBindingModal(e){
    e.preventDefault();

    this.optionResourcePayload = {
      selectedResource:this.currentWidget.selectedResource,
      selectedValueProperty:this.currentWidget.valueProperty,
      selectedDisplayProperty:this.currentWidget.displayProperty
    }

    this.modalRef = this.modalService.show(this.resourceModal,{
      class: "modal-lg"
    });
  }
}
