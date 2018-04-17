const Rx = require('rxjs');

/*

foo$:  ---0---1---2---3---4---5---6---7-----
      take(5)
       ---0---1---2---3---4|
       takeLast(2)
       ---------------3---4| <---Xこうならない
       ---------------------(34|) <--- こうなる


*/

/*
 NOTE

takeLast(1) = last() 
 

 */



let foo$ = Rx.Observable.interval(900)


let bar$ = foo$
  .take(5)
  .last()


bar$.subscribe(
  x => console.log('next ' + x),
  err => console.log(err),
  () => console.log('done')
)