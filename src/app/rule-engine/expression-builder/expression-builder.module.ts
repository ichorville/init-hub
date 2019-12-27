import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpressionBuilderRouting } from './expression-builder.routing';
import { ExpressionBuilderComponent } from './expression-builder.component';
import { ExpressionBuilderService } from './expression-builder.service';
import {FormsModule} from "@angular/forms";
import {ExpressionActionsModalComponent} from "./components/modals/expression-actions-modal/expression-actions-modal.component";
import {EXPBFieldSelectorComponent} from "./components/expb-field-selector/expb-field-selector.component";
import {FieldEventInfoComponent} from "./components/field-event-info/field-event-info.component";
import {FieldRuleInfoComponent} from "./components/field-rule-info/field-rule-info.component";
import {ExpActionBaseComponent} from "./components/exp-actions/exp-action-base/exp-action-base.component";
import {EXPBActionSelectorComponent} from "./components/expb-action-selector/expb-action-selector.component";
import {EXPBActionFactoryComponent} from "./components/expb-action-factory/expb-action-factory.component";
import {ExpActionInAppComponent} from "./components/exp-actions/exp-action-inapp/exp-action-inapp.component";
import {ExpActionServiceCallComponent} from "./components/exp-actions/exp-action-servicecall/exp-action-servicecall.component";
import {ActionStepBaseComponent} from "./components/action-steps/action-step-base/action-step-base.component";
import {ActionStepsFactoryComponent} from "./components/action-steps/action-steps-factory/action-steps-factory.component";
import {ActionStepHideComponent} from "./components/action-steps/action-step-hide/action-step-hide.component";
import {ActionStepAlertComponent} from "./components/action-steps/action-step-alert/action-step-alert.component";
import {ActionStepValidationsComponent} from "./components/action-steps/action-step-validations/action-step-validations.component";
import {ActionStepShowFormComponent} from "./components/action-steps/action-step-show-form/action-step-show-form.component";
import {ActionStepSetComponent} from "./components/action-steps/action-step-set/action-step-set.component";
import {ExpInputTypeNumberComponent} from "./components/field-event-info/exp-input-type-factory/exp-input-types/exp-input-type-number/exp-input-type-number.component";
import {ExpInputTypeFactoryComponent} from "./components/field-event-info/exp-input-type-factory/exp-input-type-factory.component";
import {ExpInputTypeFieldComponent} from "./components/field-event-info/exp-input-type-factory/exp-input-types/exp-input-type-field/exp-input-type-field.component";
import {ExpInputTypeMasterDataComponent} from "./components/field-event-info/exp-input-type-factory/exp-input-types/exp-input-type-masterdata/exp-input-type-masterdata.component";
import {ActionStepEnableComponent} from "./components/action-steps/action-step-enable/action-step-enable.component";
import {ActionStepDisableComponent} from "./components/action-steps/action-step-disable/action-step-disable.component";
import {ActionStepShowComponent} from "./components/action-steps/action-step-show/action-step-show.component";
import {ExpInputTypeStringComponent} from "./components/field-event-info/exp-input-type-factory/exp-input-types/exp-input-type-string/exp-input-type-string.component";
import {ExpInputTypeAPIComponent} from "./components/field-event-info/exp-input-type-factory/exp-input-types/exp-input-type-api/exp-input-type-api.component";
import {QueryBuilderModule} from "angular2-query-builder";
import {BsDatepickerModule, BsModalService, TabsModule, TypeaheadModule} from 'ngx-bootstrap';
import {MasterDataService} from "./masterdata-module/services/master-data.service";
import {CsiHttpService} from "./csi-web-base/csi-http-handler/csi-http.service";
import {ModuleTypeService} from "./setup-module/services/ModuleTypeService";
import {SharedService} from "./services/shared.service";
import {RulesService} from "./rules-module/services/rules.service";

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ExpressionBuilderComponent,
    ExpressionActionsModalComponent,

    EXPBFieldSelectorComponent,
    EXPBActionSelectorComponent,
    FieldRuleInfoComponent,
    FieldEventInfoComponent,

    EXPBActionFactoryComponent,
    ExpActionBaseComponent,
    ExpActionInAppComponent,
    ExpActionServiceCallComponent,

    ActionStepBaseComponent,
    ActionStepsFactoryComponent,
    ActionStepAlertComponent,
    ActionStepHideComponent,
    ActionStepShowComponent,
    ActionStepEnableComponent,
    ActionStepDisableComponent,
    ActionStepSetComponent,
    ActionStepValidationsComponent,
    ActionStepShowFormComponent,

    ExpInputTypeFactoryComponent,
    ExpInputTypeNumberComponent,
    ExpInputTypeStringComponent,
    ExpInputTypeAPIComponent,
    ExpInputTypeMasterDataComponent,
    ExpInputTypeFieldComponent
  ],
  entryComponents: [
    ExpressionBuilderComponent,
    ExpressionActionsModalComponent,

    ExpActionInAppComponent,
    ExpActionServiceCallComponent,

    ActionStepAlertComponent,
    ActionStepHideComponent,
    ActionStepShowComponent,
    ActionStepEnableComponent,
    ActionStepDisableComponent,
    ActionStepSetComponent,
    ActionStepValidationsComponent,
    ActionStepShowFormComponent,

    ExpInputTypeNumberComponent,
    ExpInputTypeStringComponent,
    ExpInputTypeAPIComponent,
    ExpInputTypeMasterDataComponent,
    ExpInputTypeFieldComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ExpressionBuilderRouting,
    QueryBuilderModule,
    BsDatepickerModule,
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),

    MatCardModule,
  ],
  providers: [
    ExpressionBuilderService,
    BsModalService,
    MasterDataService,
    CsiHttpService,
    SharedService,
    ModuleTypeService,
    RulesService
  ]
})
export class ExpressionBuilderModule { }
