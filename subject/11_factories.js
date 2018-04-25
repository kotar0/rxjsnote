const Rx = require("rxjs");

let count = 0;
function subjectFactory(){
  count++
  console.log('The number of subject is ' + count);
  return new Rx.Subject();
}

const shared = Rx.Observable
    .interval(1000)
    .take(8)
    .multicast(subjectFactory)
    .refCount()

const observerA = {
  next: x => console.log('A next: '+x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

// const sub = connectableObservable.connect(); 

const subA =  shared.subscribe(observerA);
console.log('subscribe A');

const observerB = {
  next: x => console.log('B next: '+ x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

let subB;
setTimeout( () => { 
  subB = shared.subscribe(observerB);
  console.log('subscribe B');  
}, 3000);

setTimeout( () => { 
  subA.unsubscribe(observerA);
  console.log('\'UN\'subscribe A');    
}, 4000);

setTimeout( () => { 
  subB.unsubscribe(observerB); //ここで止まる
  console.log('\'UN\'subscribe B');
}, 5000);

setTimeout( () => { 
  shared.subscribe(observerA); //ここで止まる
  console.log('\'UN\'subscribe AGAIN A');
}, 7000);



/*


*/

