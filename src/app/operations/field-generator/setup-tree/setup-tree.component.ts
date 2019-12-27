import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { FieldGeneratorService } from "../field-generator.service";

@Component({
  selector: 'app-setup-tree',
  templateUrl: './setup-tree.component.html'
})
export class SetupTreeComponent implements OnInit {

  items: TreeviewItem[];
  value: number;
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: false,
    decoupleChildFromParent: true,
    maxHeight: 400
  });

  @Input() list: TreeviewItem[];
  @Input() parent: boolean = false;
  @Output() selectedValue = new EventEmitter<number>();
  moduleTypes: any;

  constructor(
    private fieldManageService: FieldGeneratorService
  ) { }

  ngOnInit() {
    this.items = this.list;
  }

  selected(value) {
    this.value = value;
    this.selectedValue.emit(this.value);
  }

  onFilterChange(value: string) {
    console.log('filter:', value);
  }

  public loadTree() {
    this.items = [];
    this.fieldManageService.getAll().subscribe((result) => {
      this.arrangeTree(result);
    });
  }
  
  private arrangeTree(results) {
    for (let i = 0; i < results.length; i++) {
      let treeheader = ({ value: results[i].id, text: results[i].name, checked: false, children: [], collapsed: true });
      if (results[i].categories) {
        let categories = results[i].categories;
        for (let j = 0; j < categories.length; j++) {
          treeheader.children.push(new TreeviewItem({ value: categories[j].id, text: categories[j].name, checked: false }))
        }
      }
      this.items.push(new TreeviewItem(treeheader));
    }
  }
}
