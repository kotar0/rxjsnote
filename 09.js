const Rx = require('rxjs');

/*

Title: Merge

foo$:  ----0----1----2----3|
bar$:  --0--1--2--3--4

merge (OR style combinator)

marge$:--0-01--21-3--(24)----(3|)

mergeとconcatの違い。

contac$ ----0----1----2----3--0--1--2--3--(4|)
marge$:--0-01--21-3--(24)----(3|)

*/

let foo$ = Rx.Observable.interval(500).take(4);
let bar$ = Rx.Observable.interval(300).take(5);



let marge$ = Rx.Observable.merge(foo$, bar$);
// ^Same as let marge$ = foo$.merge(bar$); 

function a() {
  marge$.subscribe(
    x => console.log('next ' + x),
    err => console.log(err),
    () => console.log('done')
  )
}

let runningFunc = a();