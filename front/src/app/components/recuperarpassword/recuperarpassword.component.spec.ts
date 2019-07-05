import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarpasswordComponent } from './recuperarpassword.component';

describe('RecuperarpasswordComponent', () => {
  let component: RecuperarpasswordComponent;
  let fixture: ComponentFixture<RecuperarpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperarpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
