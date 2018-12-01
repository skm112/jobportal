import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyforjobComponent } from './applyforjob.component';

describe('ApplyforjobComponent', () => {
  let component: ApplyforjobComponent;
  let fixture: ComponentFixture<ApplyforjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyforjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyforjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
