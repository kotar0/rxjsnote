const Rx = require('rxjs');

/*

Title: Error

*/

let foo$ = Rx.Observable.interval(300).take(6)
  .zip(Rx.Observable.of('a', 'b', 'a', 'A', 1, 'c'), (_, x) => x);

const bar$ = foo$.map(x => x.toUpperCase());

/*

catch(fn(err, outputObs))
err: errを取って、observableを返す
outputObs: はエラーが起きる前までのStreamを取って、Observableを返す

--a--b--a--A--1--c|
map(toUpperCase)
--A--B--A--A--#|
catch(err => x)
--a--b--a--A--x|  skip c

*/

const result$ = bar$.catch(
  (err, outputObs) => Rx.Observable.of('x')
)

result$.subscribe(
  x => console.log(x),
  err => console.log(err),
  () => console.log('done')
)


/*

--a--b--a--A--1--c|
map(toUpperCase)
--A--B--A--A--#|
catch(err, outputObs => outoutObs)
--A--B--A--A----A--B--A--A----A--B--A--A----A--B--A--A----A--B--A--A--

*/


bar$.catch(
  (err, outputObs) => outputObs
).subscribe(
  x => console.log('outputObs: ', x),
  err => console.log(err),
  () => console.log('done')
)