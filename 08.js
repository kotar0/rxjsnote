const Rx = require('rxjs');

/*

Title: Concat nation

foo$:  ---0---1---2---3---4---5---6---7-----
      take(4)
foo$   ---0---1---2---3|
more$:                  (456789|) 
              concat
        ---0---1---2---3(456789|) 



foo$:    ---0---1---2---3---4---5---6---7-----
              take(4)
prefix$  (a|)      
foo$     ---0---1---2---3|
              concat
         a--0---1---2---3|




*/

/*
 NOTE

takeLast(1) = last() 
 

 */



let foo$ = Rx.Observable.interval(1000).take(4)
let more$ = Rx.Observable.of(4,5,6,7,8,9);
let prefix$ = Rx.Observable.of('a');


let bar$ = foo$.concat(more$);
// ^ Smme as  Rx.Observable.concat(foo$, more$);

let prefix_bar$ = prefix$.concat(foo$);
//  ^ Same as foo$.startWith('a') 


bar$.subscribe(
  x => console.log('next ' + x),
  err => console.log(err),
  () => console.log('done')
)

prefix_bar$.subscribe(
  x => console.log('next ' + x),
  err => console.log(err),
  () => console.log('done')
)