const Rx = require("rxjs");

const connectableObservable = Rx.Observable.interval(1000)
    .take(5)
    .multicast(new Rx.Subject())

const autoConnectedObservable = connectableObservable.refCount();

const observerA = {
  next: x => console.log('A next: '+x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

// const sub = connectableObservable.connect(); 

connectableObservable.subscribe(observerA);

const observerB = {
  next: x => console.log('B next: '+ x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

setTimeout( () => { // 2->1
  autoConnectedObservable.subscribe(observerB);
}, 5000);


/*
refCount

 自動的にconnectを開始して、ストリームが0になったら、unscribeする


*/

