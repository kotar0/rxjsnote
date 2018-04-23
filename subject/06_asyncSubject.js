const Rx = require("rxjs");

const connectableObservable = Rx.Observable.interval(1000)
    .take(5)
    .multicast(new Rx.Subject());


const observerA = {
  next: x => console.log('A next: '+x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

connectableObservable.connect(); // 内部のSubjectをSubscribe

connectableObservable.subscribe(observerA);

const observerB = {
  next: x => console.log('B next: '+ x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

setTimeout( () => {
  connectableObservable.subscribe(observerB);
}, 2000);



/*
Multicast and connect

MulticastはSubjectを引数にとる。記述が省略できる。
connectを実行しないとSubjectがSubscribeされない。



*/

