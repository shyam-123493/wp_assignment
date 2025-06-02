import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OopsTryAgainComponentComponent } from './oops-try-again-component.component';

describe('OopsTryAgainComponentComponent', () => {
  let component: OopsTryAgainComponentComponent;
  let fixture: ComponentFixture<OopsTryAgainComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OopsTryAgainComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OopsTryAgainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
