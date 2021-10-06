import { fakeAsync, flush, tick, flushMicrotasks } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('Async Testing Examples', () => {
  it('Asynchronous test examples with Jasmine done()', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('Asynchronous test example - setTimeout()', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      test = true;
    }, 1000);

    tick(1000); // Simulates the asynchronous passage of time for the timers in the fakeAsync zone.

    flush(); // draining the macrotask queue until it is empty in the fakeAsync zone.

    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {
    let test = false;
    console.log('1');

    Promise.resolve().then(() => {
      test = true;
      return Promise.resolve();
    }).then(() => {
      console.log('eval succesfully');
    });

    flushMicrotasks(); // Flush any pending microtasks

    expect(test).toBeTruthy();
    console.log('3');
  }));

  it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {
    let counter = 0;

    Promise.resolve()
      .then(() => {
        counter += 10;
        setTimeout(() => {
          counter += 1;
        }, 1000);
      });

    expect(counter).toBe(0);
    flushMicrotasks();  // resolves a promise so counter = 10
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10); // after 500 ms setTimeout won't yet kick in
    tick(500);
    expect(counter).toBe(11); // setTimeout kicks in => counter = 11

  }));

  it('Asynchronous test example - Observables', fakeAsync(() => {
    let test = false;

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    console.log('running test assertions');
    tick(1000); // simulates the passage of time (1000ms)
    expect(test).toBe(true);
  }));
});
