const Rx = require("rxjs");

let foo$ = Rx.Observable.interval(1000).take(5);

let observerA = {
  next: x => console.log('A next: '+x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

foo$.subscribe(observerA); //ストリームAが出来る

let observerB = {
  next: x => console.log('B next: '+ x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

setTimeout( () => {
  foo$.subscribe(observerB); //ストリームBが出来る
}, 2000);

//  ストリームAとBは別のもの

//実行結果
/*
A  ---0---1---2---3---4|

B  -------0---1---2---3---4|



​​​​​A next: 0​​​​​

​​​​​A next: 1​​​​​

​​​​​B next: 0​​​​​

​​​​​A next: 2​​​​​

​​​​​B next: 1​​​​​

​​​​​A next: 3​​​​​

​​​​​B next: 2​​​​​

​​​​​A next: 4​​​​​

​​​​​done​​​​​

​​​​​B next: 3​​​​​

​​​​​B next: 4​​​​​

​​​​​done​​​​​

 */


