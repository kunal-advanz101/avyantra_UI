import { TestBed, async } from "@angular/core/testing";
import { statusPipe } from './status.pipe';

describe('statusPipe Service', () => {
    let status;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers:[]
      })
      status=new statusPipe();
    }));  
    it("should create",()=>{
        expect(status).toBeTruthy();
    });
    it("transform method",()=>{
        status.transform(1);
        expect(status.transform(1)).toBe('Active');
        expect(status.transform(2)).toBe('Inactive')
    
      });
  
        
  });