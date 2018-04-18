const Rx = require("rxjs");

const subject = new Rx.BehaviorSubject(0);

const observerA = {
  next: x => console.log('A next: '+x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

subject.subscribe(observerA) // Subject をSubscribe
console.log('A subscribed');

const observerB = {
  next: x => console.log('B next: '+ x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

setTimeout( () => {
  subject.subscribe(observerB);// Subject をSubscribe
console.log('B subscribed');
}, 2000);


subject.next(1);
subject.next(2);
subject.next(3);


/*
BehaviorSubject

直近の値を1つ覚えているSubject

0-----1-----2-----3-----------
A  0..1.....2.....3...........
B                       3.....

*/

