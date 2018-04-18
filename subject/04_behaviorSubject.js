const Rx = require("rxjs");

const subject = new Rx.BehaviorSubject(0);

const observerA = {
  next: x => console.log('A next: '+x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

subject.map(x => ++x).subscribe(observerA) // Subject をSubscribe
console.log('A subscribed');

const observerB = {
  next: x => console.log('B next: '+ x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

setTimeout( () => {
  subject.map(x => 2*x).subscribe(observerB);// Subject をSubscribe
console.log('B subscribed');
}, 2000);


subject.next(1);
subject.next(2);
subject.next(3);


/*
BehaviorSubject

直近の値を1つ覚えているSubject

S  0-----1-----2-----3-----------
A    0..1.....2.....3...........
        map(x => ++x)
A    1..2.....3.....4...........
        
B                        3.....
                            map(x => ++x)
B                        4.....

別のオブザーバーでサブスクライブした時に直近の値を覚えていてくれる。


*/

