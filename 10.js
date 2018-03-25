const Rx = require('rxjs');

/*

Title: CombineLatest

foo$:  
      ----0----1----2----3|

bar$: 
      --0--1--2--3--4

combineLatest (AND style combinator)
combineLatet(a$, b$, ... fn(x ,y...))
x: the latest value of a$
y: the latest value of b$


latest$:
      ----01--23-4--(56)----(7|)

​​​foo is 0 | bar is 0​​​​​​​​​​​​
​​​foo is 0 | bar is 1​​​​​
​​​foo is 0 | bar is 2​​​​​
​​​foo is 1 | bar is 2​​​​​
​​​foo is 1 | bar is 3​​​​​
​​​foo is 2 | bar is 3​​​​​
​​​foo is 2 | bar is 4​​​​​
​​​foo is 3 | bar is 4​​​​​
*/

let foo$ = Rx.Observable.interval(500).take(4);
let bar$ = Rx.Observable.interval(300).take(5);



let marge$ = Rx.Observable.combineLatest(foo$, bar$, (x, y) => x+y);

function a() {
  marge$.subscribe(
    x => console.log('next ' + x),
    err => console.log(err),
    () => console.log('done')
  )
}

let runningFunc = a();
/*
next 0​​​​​

​​​​​next 1​​​​​

​​​​​next 2​​​​​

​​​​​next 3​​​​​

​​​​​next 4​​​​​

​​​​​next 5​​​​​

​​​​​next 6​​​​​

​​​​​next 7​​​​​

​​​​​done​​​​​
*/