import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonnavComponent } from './bottonnav.component';

describe('BottonnavComponent', () => {
  let component: BottonnavComponent;
  let fixture: ComponentFixture<BottonnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottonnavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottonnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
