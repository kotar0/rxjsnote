const Rx = require("rxjs");

const autoConnectedObservable = Rx.Observable
    .interval(1000)
    .share() // = .publish().refCount();

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
publish and share

publish = multicast + Subject
publishReplay = multicast + ReplaySubject
publishBehavior = multicast + BehaviorSubject
publishLast = multicast + AsyncSubject

share = publish + refCount
^ refConunt をpublishReplayなどと使いたい場合はshareを使わない。

*/

