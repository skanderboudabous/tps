import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColisRecuComponent } from './list-colis-recu.component';

describe('DashboardComponent', () => {
  let component: ListColisRecuComponent;
  let fixture: ComponentFixture<ListColisRecuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListColisRecuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColisRecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
