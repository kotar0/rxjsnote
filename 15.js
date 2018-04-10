const Rx = require('rxjs');

/*

Title: Buffer

*/

let foo$ = Rx.Observable.interval(300).take(5);

/*

--0--1--2--3--4|
    delay(1000)
------------0--1--2--3--4|


*/ 



let result$ = foo$.delay(1000);


result$.subscribe(
  x => console.log(x),
  err => console.log(err),
  () => console.log('done')
)
