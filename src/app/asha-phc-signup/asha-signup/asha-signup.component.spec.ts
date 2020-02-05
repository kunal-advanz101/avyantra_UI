import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AshaSignupComponent } from './asha-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { statusPipe } from '../../shared/pipes/status.pipe';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppHelper } from '../../shared/helper/app.helper';
import { Routes, Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: AshaSignupComponent
  }
];

describe('AshaSignupComponent', () => {
  let component: AshaSignupComponent;
  let fixture: ComponentFixture<AshaSignupComponent>;
  let router: Router;

  let routs: Routes = [
    {
      path: 'login',
      component: LoginComponent
    }
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AshaSignupComponent, statusPipe,LoginComponent],
       imports: [
         FormsModule, ReactiveFormsModule,
          NgxMaskModule.forRoot(),
        HttpClientTestingModule,
        NgxPaginationModule,
        RouterTestingModule.withRoutes(routs),
        AngularMultiSelectModule,
        NgbModalModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
      providers: [AppHelper]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AshaSignupComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    router.initialNavigation();
    let store = {};
    spyOn(window.localStorage, 'getItem').and.callFake(function () {
      return JSON.stringify({ "test": "test" });
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value;
    });
    localStorage.setItem("login_hospital", JSON.stringify({ "username": "getwell", "email": "get@yahoo.com", "user_type": "Hospital", "id": 92, "hospital_name": "getwell", "hospital_branch_name": "getwell indore", "hospital_branch_id": 59 }))

    fixture.detectChanges();
    var close = ()=>{

    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('show_password method',()=>{
    component.is_toggle=true;
    component.show_password();
    expect(component.is_toggle).toBeFalsy();
    expect(component.password).toBe('password');
    expect(component.password_class).toBe('fa fa-eye-slash');
    component.is_toggle=false;
    component.show_password();
    expect(component.is_toggle).toBeTruthy();
    expect(component.password).toBe('text');
    expect(component.password_class).toBe('fa fa-eye');
  });
  it("login called", fakeAsync(() => {
    component.login();
    tick();
    expect(router.url).toEqual('/login');
  }));
  it('signup method',()=>{
    component.signup();
    expect(component.submitted).toBeTruthy();
  })
});
