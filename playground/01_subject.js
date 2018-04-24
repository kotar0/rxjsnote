const Rx = require('rxjs');

const stream1$ = Rx.Observable.of(1,2,3,4);
const stream2$ = Rx.Observable.of(5,6,7,8);

const subject$ = new Rx.Subject();

const observerA = {
  next: x => console.log('next A:' + x),
  error: err => console.log(err),
  complete: () => console.log('A is done')
}

const observerB = {
  next: x => console.log('next B:' + x),
  error: err => console.log(err),
  complete: () => console.log('B is done')
}


subject$.subscribe(observerA)
subject$.subscribe(observerB)


stream1$.subscribe(subject$)
stream2$.subscribe(subject$)


/*



*/ 