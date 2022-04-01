import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileValidatorComponent } from './file-validator.component';

describe('FileValidatorComponent', () => {
  let component: FileValidatorComponent;
  let fixture: ComponentFixture<FileValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileValidatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
