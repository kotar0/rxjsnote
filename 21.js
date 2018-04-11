const Rx = require('rxjs');

/*

Title: Repeat
*/

let foo$ = Rx.Observable.interval(300).take(6)
  .zip(Rx.Observable.of('a', 'b', 'a', 'A'), (_, x) => x);

/*

repeat(retries)
retries: number -> retrying time.


--a--b--a--A|
  retry()
--a--b--a--A--a--b--a--A--a--b--a--A--a--b--a--A--a--b--a--A....


--a--b--a--A|
  retry(2)
--a--b--a--A--a--b--a--A--a--b--a--A|

*/

const result$ = foo$.repeat(2)

result$.subscribe(
  x => console.log(x),
  err => console.log(err),
  () => console.log('done')
)