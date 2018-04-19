const Rx = require("rxjs");

const subject = new Rx.AsyncSubject();

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
}, 5000);


setTimeout(() => { subject.next(1); }, 1000)
setTimeout(() => { subject.next(2); }, 2000)
setTimeout(() => { subject.next(3); }, 3000)
setTimeout(() => { subject.complete(); }, 4000)


/*
asyncSubject()

Completeしていれば、最後の1つの値を返す。

AsyncSubject()
S  -----1-----2-----3-----------
A                      3|
B                            3|

Output

​​​​​A subscribed​​​​​ 

​​​​​A next: 3​​​​​

​​​​​done​​​​​

​​​​​B next: 3​​​​​

​​​​​done​​​​​

​​​​​B subscribed​​​​​ 



*/

