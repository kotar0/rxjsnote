const Rx = require('rxjs');

/*

Title: withLatestFrom

*/

let foo$ = Rx.Observable.interval(500).take(5).zip(Rx.Observable.of('H', 'e', 'l', 'l', 'o'), (_, c) => c);
let bar$ = Rx.Observable.interval(300).take(7).zip(Rx.Observable.of(0, 1, 0, 1, 0, 1, 0), (_, x) => x);

/*

----H----e----l----l----o| (foo$)
--0--1--0--1--0--1--0| (bar$)
  ^     ^  ^     ^  ^ latest value

withLatestFrom()
if latest value of bar$ is 0, foo$'s char will be lower case.

----h----e----L----L----o|

*/ 




let combined$ = foo$.withLatestFrom(bar$, (c, n) => n === 1 ? c.toUpperCase() : c.toLowerCase());

function a() {
  combined$.subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('done')
  )
}

let runningFunc = a();