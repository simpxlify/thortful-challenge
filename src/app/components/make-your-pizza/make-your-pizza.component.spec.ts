import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeYourPizzaComponent } from './make-your-pizza.component';

describe('MakeYourPizzaComponent', () => {
  let component: MakeYourPizzaComponent;
  let fixture: ComponentFixture<MakeYourPizzaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeYourPizzaComponent]
    });
    fixture = TestBed.createComponent(MakeYourPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
