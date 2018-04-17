const Rx = require('rxjs');

/*

foo$:  ---0---1---2---3---4---5---6---7-----
      take(5)
       ---0---1---2---3---4|



foo$:  ---0---1---2---3---4---5---6---7-----
      first()
       ---0|


foo$:  ---0---1---2---3---4---5---6---7-----
            skip(3)
       ---------------3---4---5---6---7-----

*/

/*
 NOTE
 
  take 決まった数流す
  first 最初だけ
  skip 決まった数だけ実行しない

 */



let foo$ = Rx.Observable.interval(300)


let bar$ = foo$
  .skip(5)
  .take(3)
  .first()  


bar$.subscribe(
  x => console.log('next ' + x),
  err => console.log(err),
  () => console.log('done')
)