const Rx = require('rxjs');

/*

Title: ThrottleTime
まずEmit、そして待つ

debounceTime(1000) 1秒間何も起きない事を待つ。
ThrotteTime(1000) まずEmit、そして待つ

*/

let foo$ = Rx.Observable.interval(300).take(5);

/*

--0--1--2--3--4|

debounceTime(1000)
-------------------------4|

throttleTime(1000)
--0
   ----------         <- 1000 waiting time supporsed.
   -----2             <- but first Emit
         ----------   <- waiting
         -----4       <- emit
--0-----2-----4|

*/ 

let result$ = foo$.throttleTime(1000);


result$.subscribe(
  x => console.log(x),
  err => console.log(err),
  () => console.log('done')
)
