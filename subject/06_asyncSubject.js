const Rx = require("rxjs");

const observable = Rx.Observable.interval(1000).take(5);

const subject = new Rx.Subject();

const observerA = {
  next: x => console.log('A next: '+x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

observable.subscribe(subject)
subject.subscribe(observerA);

const observerB = {
  next: x => console.log('B next: '+ x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

setTimeout( () => {
  subject.subscribe(observerB);// Subject をSubscribe
}, 2000);



/*
Multicast and connect



*/

