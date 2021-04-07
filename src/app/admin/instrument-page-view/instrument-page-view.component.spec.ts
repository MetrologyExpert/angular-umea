import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentPageViewComponent } from './instrument-page-view.component';

describe('InstrumentPageViewComponent', () => {
  let component: InstrumentPageViewComponent;
  let fixture: ComponentFixture<InstrumentPageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentPageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
