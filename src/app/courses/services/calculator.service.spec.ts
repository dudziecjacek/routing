import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';
describe('CalculatorService', () => {
  let calculator: CalculatorService;
  let loggerSpy: LoggerService;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy } // we instead spy because it's an unit
      ]
    });

    calculator = TestBed.inject(CalculatorService);
  });

  it('add should add numbers', () => {
    const result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    const result = calculator.subtract(4, 2);
    expect(result).toBe(2);
  });
});

// describe - group of specs (often called a suite)
// it('should do x') - a single spec. Should contain one or more expectations that test the state of the code.

// xdescribe('all tests are now disabled', () => { }) // xdescribe disables one test suite
// xit('single spec disabled', () => { })
// fdescribe('only this test suite will be run', () => { })
// fit('only this spec will be run', () => { })
