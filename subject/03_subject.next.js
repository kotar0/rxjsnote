const Rx = require("rxjs");

const subject = new Rx.Subject();

const observerA = {
  next: x => console.log('A next: '+x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

subject.subscribe(observerA) // Subject をSubscribe

const observerB = {
  next: x => console.log('B next: '+ x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

setTimeout( () => {
  subject.subscribe(observerB);// Subject をSubscribe
}, 2000);


subject.next(1);
subject.next(2);
subject.next(3);

setInterval(()=>{
  subject.next(10)
}, 1000)

setTimeout(
  () => {
    subject.complete()
  },
  4000
)

/*

A  123---10----10----10----10|
B              10----10----10|
*/

