const Rx = require("rxjs");

let foo$ = Rx.Observable.interval(1000).take(5);

let subject = new Rx.Subject();

let observerA = {
  next: x => console.log('A next: '+x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

foo$.subscribe(subject);  // ObserverをSubscribe

subject.subscribe(observerA) // Subject をSubscribe

let observerB = {
  next: x => console.log('B next: '+ x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

setTimeout( () => {
  subject.subscribe(observerB);// Subject をSubscribe
}, 2000);

/*

Subjectとは

動きは、bridgeObserver同じ
Observerとも、Observableとも動く。

今回は、
foo$をObserve(観察)して、ObserverAとObserverBに値を渡す(Observable)


実行結果

​​​​​A next: 0​​​​​

​​​​​A next: 1​​​​​

​​​​​B next: 1​​​​​

​​​​​A next: 2​​​​​

​​​​​B next: 2​​​​​

​​​​​A next: 3​​​​​

​​​​​B next: 3​​​​​

​​​​​A next: 4​​​​​

​​​​​B next: 4​​​​​

​​​​​done​​​​​

​​​​​done​​​​​

*/

