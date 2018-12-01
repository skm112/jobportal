import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowappliedjobsComponent } from './showappliedjobs.component';

describe('ShowappliedjobsComponent', () => {
  let component: ShowappliedjobsComponent;
  let fixture: ComponentFixture<ShowappliedjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowappliedjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowappliedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
