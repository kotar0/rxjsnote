const Rx = require('rxjs');

/*
Diagram

----0---1---2---------------X <- err
----A---B---C---------------| <- complete
(1,2,3)---5---6
^Sync. flowing same time.

foo$: ---0---1---2---3---4---5---------
        mulitplyByTen()
bar$: ---0---10--20--30--40--50---------

*/


let foo$ = Rx.Observable.of(1,2,3,4,5);

const multiplyByTen = (source) => {
  let result = Rx.Observable.create((observer) => {
    source.subscribe(
      (x) => { observer.next(x * 10) },
      err => observer.error(err),
      () => observer.complete()
    )
  })
  return result;
}

let bar$ = multiplyByTen(foo$);

bar$.subscribe(
  x => console.log(x),
  err => console.log(err),
  () => console.log('done')
)