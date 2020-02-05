import { DateLevelPipe } from './date-level.pipe';
import { pipe } from 'rxjs';
import { async, TestBed } from '@angular/core/testing';

describe('DateLevelPipe', () => {
  let pipe;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[]
    })
    pipe=new DateLevelPipe();
  })); 

  it('create an instance', () => {
    let pipe = new DateLevelPipe();
    expect(pipe).toBeTruthy();
  });
  // it("should call transform method", () => {
  //   let date = new Date();
  //   pipe.transform(1,new Date());
  //   expect(pipe.transform('test',new Date())).toBe('NaN-NaN-412:NaN am');
  // });

});


