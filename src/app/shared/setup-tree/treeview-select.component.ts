import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { isNil } from 'lodash';
import { TreeviewConfig, TreeviewItem, TreeviewHelper, TreeviewComponent, TreeviewI18n } from 'ngx-treeview';

@Component({
	selector: 'ngx-treeview-select',
	templateUrl: './treeview-select.component.html',
	styleUrls: ['./treeview-select.component.scss']
})
export class TreeviewSelectComponent implements OnChanges {
	@Input() config: TreeviewConfig;
	@Input() items: TreeviewItem[];
	@Input() value: any;
	@Output() valueChange = new EventEmitter<any>();
	@Input() parent: boolean;
	@ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;
	filterText: string;

	constructor(public i18n: TreeviewI18n) {
		this.config = TreeviewConfig.create({
			hasAllCheckBox: false,
			hasCollapseExpand: false,
			hasFilter: true,
			maxHeight: 500
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (isNil(this.value)) {
			this.selectAll();
		} else {
			this.updateSelectedItem();
		}
	}

	select(item: TreeviewItem) {
		if (!this.parent) {
			this.items.forEach(parent => {
				if (parent.children) {
					parent.children.forEach(child => {
						if (item.text === child.text && item.value === child.value) {
							item.checked = true;
							child.checked = true;
						}
						if (item.text !== child.text || item.value !== child.value) {
							child.checked = false;
						}
					});
				}
			});
			this.selectItem(item);
		} else {
			this.items.forEach(parent => {
				if (item.text === parent.text && item.value === parent.value) {
					item.checked = true;
					parent.checked = true;
				}
				if (item.text !== parent.text || item.value !== parent.value) {

					parent.checked = false;
				}
			});
			this.selectItem(item);
		}
	}

	private updateSelectedItem() {
		if (!isNil(this.items)) {
			const selectedItem = TreeviewHelper.findItemInList(this.items, this.value);
			if (selectedItem) {
				this.selectItem(selectedItem);
			} else {
				this.treeviewComponent.filterText = '';
				this.filterText = '';
				this.selectAll();
			}
		}
	}

	private selectItem(item: TreeviewItem) {
		if (item) {
			if (this.value !== item.value) {
				this.value = item.value;
				this.valueChange.emit(item);
			}
		} else {
			this.value = null;
			this.valueChange.emit(null);
		}
	}

	private selectAll() {
		const allItem = this.treeviewComponent.allItem;
		this.selectItem(allItem);
	}

	public isSelect(item) {
		item.checked = !item.checked;
		if (item.checked) {
			this.select(item);
		} else {
			this.select(null);
		}
	}
}
