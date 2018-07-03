import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasPhotoUploaderComponent } from './canvas-photo-uploader.component';

describe('CanvasPhotoUploaderComponent', () => {
  let component: CanvasPhotoUploaderComponent;
  let fixture: ComponentFixture<CanvasPhotoUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasPhotoUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasPhotoUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
