const Rx = require('rxjs');

/*

foo$:  ---0---1---2---3---4---5---------
        .do(x => { console.log('before ' + x) })        
       ---0---1---2---3---4---5---------
        .map(x => x * 2)
       ---0---2---4---6---8---10---------
        .do(x => { console.log('after ' + x) })        

*/

/**
 * NOTE
 * 
 * do オペレーターは何もリターンしない。何か間でConsole.logなどを挟みたい時に使う。
 * map オペレーターは返し値がある。
 * 
 */


let foo$ = Rx.Observable.interval(200).take(4);


let bar$ = foo$
  .do(x => { console.log('before ' + x) })
  .map(x => x * 2)
  .do(x => { console.log('after ' + x) })


bar$.subscribe(
  x => console.log('next ' + x),
  err => console.log(err),
  () => console.log('done')
)