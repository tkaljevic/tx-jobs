import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpLoaderComponent } from './http-loader.component';

describe('HttpLoaderComponent', () => {
  let component: HttpLoaderComponent;
  let fixture: ComponentFixture<HttpLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
