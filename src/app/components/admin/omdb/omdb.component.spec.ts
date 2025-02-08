import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmdbComponent } from './omdb.component';

describe('OmdbComponent', () => {
  let component: OmdbComponent;
  let fixture: ComponentFixture<OmdbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmdbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
