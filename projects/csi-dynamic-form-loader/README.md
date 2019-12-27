# CSI DYNAMIC FORM LOADER

This library providing service to preview personalized forms from the Admin UI.

## Follow the instructions.

### Step 1: Install Library
```
npm install @csi/csi-dynamic-form-loader
```

### Step 2: Import Module and Set Configuration for the library

Module.ts

```typescript

const DYNAMIC_FORM_LOADER_CONFIG:FormLoaderConfigs={
    API_GATEWAY_SERVER : 'PLACE YOUR URL HERE...'
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CsiDynamicFormLoaderModule.forRoot(DYNAMIC_FORM_LOADER_CONFIG)
  ],
  bootstrap: [AppComponent]
})
```

*OR*

Module.ts

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CsiDynamicFormLoaderModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
```

Component.ts

```typescript
constructor(private formLoaderConfig:FormLoaderConfigService){
    // Can set the library configurations using FormLoaderConfigService
    this.formLoaderConfig.setConfig({API_GATEWAY_SERVER:"PLACE_YOUR_URL_HERE"});
}
```

### Step 3: Usage

1. Load preview form model using service

```typescript
showFormLoaderModel(){
    this.dynamicFormLoaderService.loadForm("1329883",{
        pomrId:123,
        patientId:23
    });
}
```

2. Preview form using component

```html
<csi-dynamic-form-loader [formId]="formId" [contextData]="{patientId:12}"><csi-dynamic-form-loader>
```

## API Reference

### CSI-DYNAMIC-FORM-LOADER Component Inputs

* formId:any
* contextData:ApiContext
* gridLength?:number;
* childToPrevious?:boolean;
* form?:FormGroup;

### Interfaces

```typescript
export interface ApiContext{
    patientId:any;
    pomrId:any;
}
```

```typescript
export interface FormLoaderConfigs{
    API_GATEWAY_SERVER:string;
}
```

### This module only works when following modules were installed

Before use csi-dynamic-form-loader module following dependencies need to be installed and configured properly.

```
@csi/csi-admission-request
@csi/csi-ag-grid
@csi/csi-allergy
@csi/csi-chief-complaint
@csi/csi-doctor-notes
@csi/csi-e-consent
@csi/csi-orders
@csi/csi-pr-vital-signs
```

## Further help

CSI.UIF Team