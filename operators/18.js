const Rx = require('rxjs');

/*

Title: distinct / distinctUntilChanged

同じ値(既出の値)をフィルタリングする関数

*/

let foo$ = Rx.Observable.interval(300).take(6)
  .zip(Rx.Observable.of('a', 'b', 'a', 'A', 'b', 'c'), (_, x) => x);

/*

--a--b--a--A--b--c|
distinct()

--a   momory ['a']
--a--b   momory ['a', 'b']
--a--b---   notthing because of 'a' is aleady in memory
--a--b-----A   momory ['a', 'b', 'A']
--a--b-----A---   'b' is in memory
--a--b-----A-----c   momory ['a', 'b', 'A', 'c']

*/

let result$ = foo$.distinct();


result$.subscribe(
  x => console.log(x),
  err => console.log(err),
  () => console.log('done')
)


/* 
# compare / flusher function

distinct(compareFn, flusherFn)

compareFn: bool
flusherFn: Observable

compare = (x, y) => x.toLowerCase() === y.toLowerCase();

--a--b--a--A--b--c|
distinct(compare)
--a--b-----------c

flusher

let flusher = Rx.Observable.interval(1000).take(1)
  .concat(Rx.Observable.never());

--a--b--a--A--b--c|
----------0---------....

--a--b-----A--b--c|

*/
let flusher = Rx.Observable.interval(1000).take(1)
  .concat(Rx.Observable.never());

let flusherResult$ = foo$.distinct((x) => x, flusher );

flusherResult$.subscribe(x => console.log(x))


/*

#distinctUntilChanged


--a--b--a--a--b--b
distinctUntilChanged()

--a--b--a-----b---|

*/ 


let bar$ = Rx.Observable.interval(300).take(6)
  .zip(Rx.Observable.of('a', 'b', 'a', 'a', 'b', 'b'), (_, x) => x);


changeUntilResult$ = bar$.distinctUntilChanged();

changeUntilResult$.subscribe(x => console.log('changeUntil', x))