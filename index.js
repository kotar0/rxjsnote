const Rx = require('rxjs');

let foo$ = Rx.Observable.of(1,2,3,4,5);

const multiplyByTen = (source) => {
  let result = Rx.Observable.create(function subscribe(observer){
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