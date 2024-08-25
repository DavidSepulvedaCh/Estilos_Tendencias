import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceComponent } from './create-service.component';

describe('CreateServiceComponent', () => {
  let component: CreateServiceComponent;
  let fixture: ComponentFixture<CreateServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateServiceComponent]
    });
    fixture = TestBed.createComponent(CreateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
