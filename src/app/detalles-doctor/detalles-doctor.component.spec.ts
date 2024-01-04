import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesDoctorComponent } from './detalles-doctor.component';

describe('DetallesDoctorComponent', () => {
  let component: DetallesDoctorComponent;
  let fixture: ComponentFixture<DetallesDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
