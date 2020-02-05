import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AshaPhcDashboardComponent } from './asha-phc-dashboard.component';
import { statusPipe } from '../../shared/pipes/status.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppHelper } from '../../shared/helper/app.helper';
import { Routes } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';
import { Component } from '@angular/core';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { GeneralComponent } from 'src/app/dashboard/general/general.component';
import { MaternalComponent } from 'src/app/dashboard/maternal/maternal.component';
import { BabyRespComponent } from 'src/app/dashboard/baby-resp/baby-resp.component';
import { BabyAppearComponent } from 'src/app/dashboard/baby-appear/baby-appear.component';
import { MatTabsModule, MatIconModule } from '@angular/material';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: "test-test",
  template:""
})
class MockAshaPhcDashboard{
}

export const routes: Routes = [
  {
    path: 'dashboard', component: MockAshaPhcDashboard,
    children: [
      {path: '', redirectTo: 'baby-profile', pathMatch: 'prefix'},
      {path: 'baby-profile', component: GeneralComponent,canActivate: [AuthGuard]},
      {path: 'mother-profile', component: MaternalComponent,canActivate: [AuthGuard]},
      {path: 'baby-appearence', component: BabyAppearComponent,canActivate: [AuthGuard]},
   
    ],
    runGuardsAndResolvers: 'always',
  }
];

describe('AshaPhcDashboardComponent', () => {
  let component: AshaPhcDashboardComponent;
  let fixture: ComponentFixture<AshaPhcDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AshaPhcDashboardComponent, statusPipe,
        GeneralComponent,MaternalComponent,BabyAppearComponent,
      
        MockAshaPhcDashboard
      ],
       imports: [
         FormsModule, ReactiveFormsModule,
          NgxMaskModule.forRoot(),
        HttpClientTestingModule,
        NgxPaginationModule,
        AngularMultiSelectModule,
        NgbModalModule,
        MatTabsModule,
        MatIconModule,
        BsDatepickerModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
      providers: [AppHelper,DataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AshaPhcDashboardComponent);
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('checkReading method',()=>{
    let obj={
      reading:"null"
    }
    component.checkReading(obj);
  });
  it('close method', () => {
    component.open("content",{});
     spyOn(component.formRef,'close');
    component.close();
    expect(component.formRef.close).toHaveBeenCalled();
  });
  it("success method ",()=>{
    let response={
      message: 'this is resource not found', 
      response : [], 
      status : 404, error:true, success : false
    }
    component.success(response,"referralOpinions"); 
  });
  it('open method', () => {
    spyOn(component['modalService'], 'open');
    component.open("openDetial",{});
    expect(component['modalService'].open).toHaveBeenCalled();
});
it('getOpinions method',()=>{
  component.getOpinions(643);
});
it('nextPage method',()=>{
  component.nextPage(1);
  expect(component.page).toBe(1);
});
it('onDropDownChange method',()=>{
  spyOn(component,'getAshaBMRRecords');
  component.onDropDownChange(10);
  expect(component.getAshaBMRRecords).toHaveBeenCalled();
});

it('ahsaBmrSearch search text not null method',()=>{
  spyOn(component,'getAshaBMrRecordsCount');
  let searchText="test_search";
  component.ahsaBmrSearch();
  expect(component.getAshaBMrRecordsCount).toHaveBeenCalled();
})
it('goToAshaForm method',()=>{
  let obj={
  }
  component.goToAshaForm(obj)
})

it('ahsaBmrSearch search text null method',()=>{
  spyOn(component,'getAshaBMrRecordsCount');
  let searchText=null;
  component.ahsaBmrSearch();
  expect(component.getAshaBMrRecordsCount).toHaveBeenCalled();
});

});
