const Rx = require("rxjs");

const connectableObservable = Rx.Observable.interval(1000)
    .take(5)
    .multicast(new Rx.Subject());


const observerA = {
  next: x => console.log('A next: '+x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

const sub = connectableObservable.connect(); // 手動でスタートしている。明示的に終わらせないと終了しない。

connectableObservable.subscribe(observerA);

const observerB = {
  next: x => console.log('B next: '+ x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

setTimeout( () => {
  connectableObservable.subscribe(observerB);
}, 2000);

setTimeout( () => {
  sub.unsubscribe();
  console.log('unsbscribed');
}, 5000);




/*


*/

