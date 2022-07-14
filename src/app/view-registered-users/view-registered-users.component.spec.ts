import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegisteredUsersComponent } from './view-registered-users.component';

describe('ViewRegisteredUsersComponent', () => {
  let component: ViewRegisteredUsersComponent;
  let fixture: ComponentFixture<ViewRegisteredUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRegisteredUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRegisteredUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
