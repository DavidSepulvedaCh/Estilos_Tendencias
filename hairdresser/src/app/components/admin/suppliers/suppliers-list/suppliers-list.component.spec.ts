import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersListComponent } from './suppliers-list.component';

describe('SuppliersListComponent', () => {
  let component: SuppliersListComponent;
  let fixture: ComponentFixture<SuppliersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersListComponent]
    });
    fixture = TestBed.createComponent(SuppliersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
