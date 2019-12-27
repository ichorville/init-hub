import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GridsterComponent, IGridsterOptions, IGridsterDraggableOptions } from 'angular2gridster';
import { MatDialog } from '@angular/material';
import { CsiToastsService } from '@csi/csi-toastr';

import { ScreenPreviewComponent } from '../screen-preview/screen-preview.component';
import { ScreenGeneratorService } from '../screen-generator.service';

@Component({
  selector: 'app-screen-grid',
  templateUrl: './screen-grid.component.html',
  styleUrls: ['./screen-grid.component.css']
})
export class ScreenGridComponent implements OnInit {
  screenName: string;
	screenLoadedForEdit: boolean = false;
	@ViewChild(GridsterComponent) gridster: GridsterComponent;

	constructor(
		private _sgs: ScreenGeneratorService,
		public dialog: MatDialog,
		private toastr: CsiToastsService,
		private router: Router,
		private route: ActivatedRoute
	) {
		// adding a new form into the canvas
		this._sgs.formSelectNotifierGetter().subscribe(res => {
			console.log(res)
			this.widgets.filter(element => element.title === res.name).length > 0 ? 
				[this.widgets.filter(element => element.title === res.name)[0].previouslySelected = true,
					setTimeout(() => {
						this.widgets.filter(element => element.title === res.label)[0].previouslySelected = false
					}, 2000)] :
				// add selected element to grid
				[this.widgets.push({
					x: 4, y: 0, w: 3, h: 1,
					title: res.name,
					dragAndDrop: true,
					resizable: true,
					content: 'form',
					controlContent: res
				})];
		});

		// adding a new grid identifier to the canvas
		// this._fgs.addGridGetter().subscribe(res => {
		// 	res.controlType = 'gridItem';
		// 	this.widgets.push({
		// 		x: 4, y: 0, w: 3, h: 1,
		// 		title: res.gridName,
		// 		dragAndDrop: true,
		// 		resizable: true,
		// 		content: 'grid',
		// 		controlContent: res
		// 	});
		// });

		// add an exisitng form onto the canvas
		// this._fgs.addFormGetter().subscribe(res => {
		// 	res.controlType = 'formItem';
		// 	this.widgets.push({
		// 		x: 4, y: 0, w: 3, h: 1,
		// 		title: res.name,
		// 		dragAndDrop: true,
		// 		resizable: true,
		// 		content: 'form',
		// 		controlContent: res
		// 	});
		// });

		// load currently selected form fields onto canvas for edit scenario
		// this._fgs.addFormInlineGetter().subscribe(res => {
		// 	this.screenName = res.name;
		// 	this.widgets = res.data;
		// 	this.screenLoadedForEdit = true;
		// });
	}

	gridsterOptions: IGridsterOptions = {
		// core configuration is default one - for smallest view. It has hidden minWidth: 0.
		lanes: 12, // amount of lanes (cells) in the grid
		direction: 'vertical', // floating top - vertical, left - horizontal
		floating: true,
		dragAndDrop: true, // enable/disable drag and drop for all items in grid
		resizable: true, // enable/disable resizing by drag and drop for all items in grid
		resizeHandles: {
			s: true,
			e: true,
			se: true
		},
		widthHeightRatio: 1, // proportion between item width and height
		lines: {
			visible: true,
			color: '#afafaf',
			width: 1,
			always: false
		},
		shrink: true,
		useCSSTransforms: true,
		responsiveView: true, // turn on adopting items sizes on window resize and enable responsiveOptions
		responsiveDebounce: 500, // window resize debounce time
		responsiveSizes: true,
		// List of different gridster configurations for different breakpoints.
		// Each breakpoint is defined by name stored in "breakpoint" property. There is fixed set of breakpoints
		// available to use with default minWidth assign to each.
		// - sm: 576 - Small devices
		// - md: 768 - Medium devices
		// - lg: 992 - Large devices
		// - xl: 1200 - Extra large
		// MinWidth for each breakpoint can be overwritten like it's visible below.
		// ResponsiveOptions can overwrite default configuration with any option available.
		responsiveOptions: [
			{
				breakpoint: 'sm',
				// minWidth: 480,
				lanes: 3
			},
			{
				breakpoint: 'md',
				minWidth: 768,
				lanes: 4
			},
			{
				breakpoint: 'lg',
				minWidth: 1250,
				lanes: 12
			}
		]
	};
	gridsterDraggableOptions: IGridsterDraggableOptions = {
		handlerClass: 'panel-heading'
	};

	widgetsCopy = [];
	widgets: Array<any> = [];

	ngOnInit() {
		this.widgetsCopy = this.widgets.map(widget => ({ ...widget }));
	}

	onReflow(event) {
		// console.log('onReflow', event);
	}

	setWidth(widget: any, size: number, e: MouseEvent, gridster) {
		e.stopPropagation();
		e.preventDefault();
		if (size < 1) {
			size = 1;
		}
		widget.w = size;
		gridster.reload();
		return false;
	}

	optionsChange(options: IGridsterOptions) {
		this.gridsterOptions = options;
		// console.log('options change:', options);
	}

	addWidgetWithoutData() {
		this.widgets.push({
			title: 'Basic form inputs X',
			dragAndDrop: true,
			resizable: true,
			content: ''
		});
	}

	addWidget(gridster: GridsterComponent) {
		this.widgets.push({
			x: 4, y: 0, w: 1, h: 1,
			dragAndDrop: true,
			resizable: true,
			title: 'Basic form inputs 5',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
				'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
				'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
				'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ' +
				'laborum.'
		});
		console.log('widget push', this.widgets[this.widgets.length - 1]);
	}

	removeField($event, index: number, gridster: GridsterComponent) {
		$event.preventDefault();
		this.widgets.splice(index, 1);
	}

	removeAll() {
		this.widgets = [];
	}

	itemChange($event: any, gridster) {
		// console.log('item change', $event);
	}

	resetWidgets() {
		this.widgets = this.widgetsCopy.map(widget => ({ ...widget }));
	}

	showPreview() {
		if (this.widgets.length > 0) {
			// copy referrence to a new arr and save in localStorage
			// localStorage.setItem('gridster', JSON.stringify(this.widgets.map(widget => ({ ...widget }))));
			const dialogRef = this.dialog.open(ScreenPreviewComponent, {
				width: '1336px',
				data: { name: this.screenName, data: this.widgets }
			});
		}
	}

	viewGrid() {
		this.gridsterOptions.lines.always == false ? 
			this.gridsterOptions.lines.always = true : 
				this.gridsterOptions.lines.always = false;
				this.gridster.reload();
	}

	preSave() {
	}

	onFieldClick(field) {
		// // load pre-save meta view only for field types
		// if (field.content != 'grid' && field.content != 'form') {
		// 	const dialogRef = this.dialog.open(FieldMetaDataComponent, {
		// 		width: '1336px',
		// 		data: field
		// 	});
	
		// 	dialogRef.afterClosed().subscribe(result => {
		// 		console.log(result)
		// 	});
		// }
	}
}
