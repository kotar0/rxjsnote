const Rx = require('rxjs');

/*

Title: debounceTime
waits for silence

debounceTime(1000)
1秒間何も起きない事を待つ。

*/

let foo$ = Rx.Observable.interval(300).take(5);

/*

--0--1--2--3--4|
debounceTime(1000)
--x--
     x--
        x--
           x--
              x----------4|
つまり
-------------------------4|


*/ 



let result$ = foo$.debounceTime(1000);


result$.subscribe(
  x => console.log(x),
  err => console.log(err),
  () => console.log('done')
)
