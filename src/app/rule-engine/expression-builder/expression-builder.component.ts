import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { ExpressionBuilderService } from './expression-builder.service';
import { RuleComponentModel } from "./models/rule-component.model";
import { RuleModuleScreenModel } from "./models/rule-module-screen.model";
import {log} from "util";

@Component({
  selector: 'app-expression-builder',
  templateUrl: './expression-builder.component.html',
  styleUrls: ['./expression-builder.component.css']
})
export class ExpressionBuilderComponent implements OnInit {

  title: string;
  fromFormBuilder = false;
  loadingCompleted: boolean;
  formId: string;
  formName: string;
  ruleJson: any;

  modules: string[] = [];
  screens: string[] = [];
  selectedModuleId = '-1';
  selectedScreenId = '-1';
  selectedScreenComponents: RuleComponentModel[] = [];
  selectedFieldComponent: RuleComponentModel = null;

  constructor(
    private expressionBuilderService: ExpressionBuilderService,
    private route: ActivatedRoute
  ) {
    this.loadingCompleted = false;
    this.title = 'Expression Builder';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.formId = params['formId']
    });

    if (this.formId != undefined) {
      this.fromFormBuilder = true;
    }

    // load expression builder functionality over currenty selected formId
    if (this.fromFormBuilder) {
      this.modules = ["Custom Forms"];
      this.expressionBuilderService.getRulesByModuleScreen("CUSTOM_FORMS", this.formId).subscribe(res => {
        this.formName = res.screenName;
        this.ruleJson = res;
        this.screens.push(this.formName);
        this.selectedModuleId = 'CUSTOM_FORMS';
        this.selectedScreenId = this.formName;
        this.selectedScreenComponents = this.ruleJson.components;
        this.loadingCompleted = true;
      }, error => {
        alert("No Rules Found");
      });
    } else {
      this.loadModules();
    }
  }

  // start - legacy

  /* **************************************************************************************************************
    *** METHODS
    ****************************************************************************************************************/

  loadModules() {
    this.expressionBuilderService.getModules()
      .subscribe(
        (data) => {
          if (data) {
            this.modules = data;
            console.log(this.modules);
          }
        },
        (error) => {
          this.alertMessage(error);
        }
      );
  }

  loadScreens(moduleKey: string) {
    this.expressionBuilderService.getScreensByModule(moduleKey)
      .subscribe(
        (data) => {
          if (data) {
            this.screens = data;
          }
        },
        (error) => {
          this.alertMessage(error);
        }
      );
  }

  loadRules(moduleKey: string, screenKey: string) {
    this.expressionBuilderService.getRulesByModuleScreen(moduleKey, screenKey)
      .subscribe((data: RuleModuleScreenModel) => {
          if (data) {
            this.selectedScreenComponents = data.components;
          }
        },
        (error) => {
          this.alertMessage(error);
        }
      );
  }

  alertMessage(message) {
    alert(message);
    // this._csiAlertService.success('Message', message, 'OK', 'btn');
  }

  alertError(message) {
    alert(message);
    // this._csiAlertService.success('Error', message, 'OK', 'btn');
  }

  /* **************************************************************************************************************
    *** EVENTS
    ****************************************************************************************************************/

  onChange_Module(event) {
    this.screens = [];
    this.selectedScreenComponents = [];
    this.selectedScreenId = '-1';
    this.screens = [];
    this.loadScreens(this.selectedModuleId);
  }

  onChange_Screen(event) {
    this.selectedScreenComponents = [];
    if (this.screens) {
      this.loadRules(this.selectedModuleId, this.selectedScreenId);
    }
  }

  onSelect_Field(event: RuleComponentModel) {
    this.selectedFieldComponent = event;
  }

  onClick_Update(event) {
    const ruleModel = this.selectedFieldComponent.getParent();
    console.log(ruleModel)
    this.expressionBuilderService.updateRules(ruleModel)
      .subscribe(() => {
          this.alertMessage('Saved.');
        },
        (error) => {
          this.alertMessage(error);
        }
      );
  }

  // end - legacy
}
