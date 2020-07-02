import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UncertaintyPageComponent } from './uncertainty-page.component';

describe('UncertaintyPageComponent', () => {
  let component: UncertaintyPageComponent;
  let fixture: ComponentFixture<UncertaintyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UncertaintyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UncertaintyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
