import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentPageEditComponent } from './instrument-page-edit.component';

describe('InstrumentPageEditComponent', () => {
  let component: InstrumentPageEditComponent;
  let fixture: ComponentFixture<InstrumentPageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentPageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentPageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
