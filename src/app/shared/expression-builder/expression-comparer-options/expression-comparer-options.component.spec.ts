import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionComparerOptionsComponent } from './expression-comparer-options.component';

describe('ExpressionComparerOptionsComponent', () => {
  let component: ExpressionComparerOptionsComponent;
  let fixture: ComponentFixture<ExpressionComparerOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionComparerOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionComparerOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
