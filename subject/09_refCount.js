const Rx = require("rxjs");

const connectableObservable = Rx.Observable
    .interval(1000)
    .multicast(new Rx.Subject())

const autoConnectedObservable = connectableObservable.refCount();

const observerA = {
  next: x => console.log('A next: '+x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

// const sub = connectableObservable.connect(); 

const subA =  autoConnectedObservable.subscribe(observerA);

const observerB = {
  next: x => console.log('B next: '+ x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

let subB;
setTimeout( () => { 
  subB = autoConnectedObservable.subscribe(observerB);
}, 5000);

setTimeout( () => { 
  subA.unsubscribe(observerA);
}, 6000);

setTimeout( () => { 
  subB.unsubscribe(observerB); //ここで止まる
}, 7000);


/*
refCount

 自動的にconnectを開始して、Subscribeしているストリームが0になったら、完了する。


*/

