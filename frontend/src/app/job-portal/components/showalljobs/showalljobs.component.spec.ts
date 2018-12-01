import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowalljobsComponent } from './showalljobs.component';

describe('ShowalljobsComponent', () => {
  let component: ShowalljobsComponent;
  let fixture: ComponentFixture<ShowalljobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowalljobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowalljobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
