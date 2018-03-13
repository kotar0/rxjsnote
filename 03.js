const Rx = require('rxjs');

/*
Diagram

----0---1---2---------------X <- err
----A---B---C---------------| <- complete
(1,2,3)---5---6
^Sync. flowing same time.

foo$: ---0---1---2---3---4---5---------
        map(fn)
bar$: ---0---2---4---6---8---10---------

*/


let foo$ = Rx.Observable.interval(1000);


//  this is map
function calculate (transformationFn) {
  let result = Rx.Observable.create((observer) => {
    this.subscribe(
      (x) => { observer.next(transformationFn(x)) },
      err => observer.error(err),
      () => observer.complete()
    )
  })
  return result;
}

Rx.Observable.prototype.calculate = calculate;

//let bar$ = foo$.calculate(x => x / 2);
let bar$ = foo$.map(x => x / 2);

bar$.subscribe(
  x => console.log(x),
  err => console.log(err),
  () => console.log('done')
)