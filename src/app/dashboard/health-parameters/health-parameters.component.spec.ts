import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthParametersComponent } from './health-parameters.component';
import { statusPipe } from 'src/app/shared/pipes/status.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../general/general.component.spec';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppHelper } from 'src/app/shared/helper/app.helper';
import { DataService } from 'src/app/shared/service/data.service';
import { GeneralComponent } from '../general/general.component';
import { MatTabsModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

describe('HealthParametersComponent', () => {
  let component: HealthParametersComponent;
  let fixture: ComponentFixture<HealthParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HealthParametersComponent, statusPipe,GeneralComponent],
       imports: [
         FormsModule, ReactiveFormsModule,
          NgxMaskModule.forRoot(),
        HttpClientTestingModule,
        NgxPaginationModule,
        AngularMultiSelectModule,
        NgbModalModule,
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        MatTabsModule,
        MatIconModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModalModule,
        BsDatepickerModule.forRoot(),
    ],
      providers: [AppHelper,DataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthParametersComponent);
    component = fixture.debugElement.componentInstance;
    
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
    component.formRef = {close: close}
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('updateForm method',()=>{
    let obj={
      baby_blood_pressure_mean_arterial_bp:"NA",
      baby_blood_pressure_upper_limb:"NA",
      baby_blood_pressure_lower_limb:"NA",
      frequency_of_stools:"NA"
    }
    component.updateForm(obj);
    expect(component.isBpArterial).toBeFalsy();
  });
  it("when  close method is called", () => {
    spyOn(component.formRef, 'close');
    component.close();
    expect(component.formRef.close).toHaveBeenCalled();
  });
  it('saveAshaReadingFormData method',()=>{
    let formObj={
    }
    component.saveAshaReadingFormData(formObj);
  });
  it('healthParametersSubmit method',()=>{
    component.healthParametersSubmit();
    expect(component.submitted).toBeTruthy();
  });
  it('saveReading method',()=>{
    component.saveReading();
  });
  it('getHealthParameters',()=>{
    component.getHealthParameters(643);
  })
  it('ValidateAllForms',()=>{
    component.ValidateAllForms();
  });

  it('onChanges',()=>{
    component.onChanges();
  });
  it('onInputChange method',()=>{
    let event={
      target:{
        name:"Arterial_BP",value:"2"
      },
      srcElement:"",
      currentTarget:""
    }
    component.onInputChange(event);
    expect(component.isBpArterial).toBeFalsy();

    let event_2={
      target:{
        name:"upper_limb",value:"2"
      },
      srcElement:"",
      currentTarget:""
    }
    component.onInputChange(event_2);
    expect(component.isBpArterial).toBeFalsy();

    let event_3={
      target:{
        name:"lower_limb",value:"2"
      },
      srcElement:"",
      currentTarget:""
    }
    component.onInputChange(event_3);
    expect(component.isBpArterial).toBeFalsy();

    let event_4={
      target:{
        name:"Frequency",value:"2"
      },
      srcElement:"",
      currentTarget:""
    }
    component.onInputChange(event_4);
    expect(component.isBpArterial).toBeFalsy();
  });
  // it('setDataPoints method',()=>{
  //   component.setDataPoints();
  // })
  

});
