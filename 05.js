const Rx = require('rxjs');

/*

foo$:  ---0---1---2---3---4---5----
filter(x => x % 2 === 0) <- the function is called predicate
    :  ---0-------2-------4--------

*/



let foo$ = Rx.Observable.interval(200)


let bar$ = foo$
  .filter(x => x % 2 === 0)


bar$.subscribe(
  x => console.log('next ' + x),
  err => console.log(err),
  () => console.log('done')
)