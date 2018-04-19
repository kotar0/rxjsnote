const Rx = require("rxjs");

const subject = new Rx.ReplaySubject(3, 3000);

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


/*
replaySubject(bufferSize = Number.POSITIVE_INFINITY, windowTime = Number.POSITIVE_INFINITY, scheduler)

直近の値を1つ覚えているSubject

replaySubject(2)
S  -----1-----2-----3-----------
A    ...1.....2.....3...........
B                    ...........(2,3).....

ReplaySubject(3, 3000)
S  -----1-----2-----3-----------
A    A..1.....2.....3...........
B                    ...........B(2,3).....
            ....................|
              | -> 3000ms以内でないといけない。

Output

​​​​​A subscribed​​​​​

​​​​​A next: 1​​​​​

​​​​​A next: 2​​​​​

​​​​​A next: 3​​​​​

​​​​​B next: 2​​​​​

​​​​​B next: 3​​​​​

​​​​​B subscribed​​​​​ 


*/

