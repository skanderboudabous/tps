import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColisExpComponent } from './list-colis-exp.component';

describe('ListColisExpComponent', () => {
  let component: ListColisExpComponent;
  let fixture: ComponentFixture<ListColisExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListColisExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColisExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
