import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColisExpComponent } from './add-colis-exp.component';

describe('AddColisExpComponent', () => {
  let component: AddColisExpComponent;
  let fixture: ComponentFixture<AddColisExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddColisExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddColisExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
