const Rx = require('rxjs');

/*

Title: Retry / retryWhen

*/

let foo$ = Rx.Observable.interval(300).take(6)
  .zip(Rx.Observable.of('a', 'b', 'a', 'A', 1, 'c'), (_, x) => x);

const bar$ = foo$.map(x => x.toUpperCase());

/*

Retry(retries)
retries: number -> retrying time.


--a--b--a--A--1--c|
map(toUpperCase)
--A--B--A--A--#|
  retry()
--A--B--A--A----A--B--A--A----A--B--A--A----A--B--A--A----A--B--A--A--....

*/

const result$ = bar$.retry()

result$.subscribe(
  x => console.log(x),
  err => console.log(err),
  () => console.log('done')
)


/* 

--a--b--a--A--1--c|
map(toUpperCase)
--A--B--A--A--#|
  retry(2)
--A--B--A--A----A--B--A--A----A--B--A--A----A--B--A--A--#|

*/

bar$.retry(2)
  .subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('done')
  )

/*

retryWhen
errのストリームに作用させる。

--A--B--A--A--#|
retryWhen(errObs => errObs.delay(1000))
succ  --A--B--A--A-----A--B--A--A-----A--B--A--A---...
err   --------------#--------------#--------------#...
->
err   --------------#-------------------------#-------------------------#...
succ  --A--B--A--A---------------A--B--A--A---------------A--B--A--A---...


*/

bar$.retryWhen(err$ => err$.delay(1000))
  .subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('done')
  )
