const Rx = require('rxjs');

/*

Title: zip

*/

let foo$ = Rx.Observable.interval(500).take(5)
let bar$ = Rx.Observable.interval(400).take(4)

/*

----0----1----2----3----4| foo$
---0---1---2---3| bar$
   ^   ^   ^   ^
zip
----0----2----4----6|


----H----e----l----l----o| (foo$)
--0--1--0--1--0--1--0| (bar$)
--^--^--^--^--^
zip
----h----E----l----L----o


zip
First of foo + First of bar => First of output
Second of foo + Second of bar => Second of output
......
N-th of foo + N-th of bar => N-th of output





*/ 




let combined$ = foo$.zip(bar$, (x, y) => x + y);
// Same as Rx.zip(foo$, bar$, (x,y) => x + y);

function a() {
  combined$.subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('done')
  )
}

let runningFunc = a();