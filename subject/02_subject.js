const Rx = require("rxjs");

let foo$ = Rx.Observable.interval(1000).take(5);

let observerA = {
  next: x => console.log('A next: '+x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

let bridgeObserver = {
  next: function(x) {
    this.observers.forEach(o => o.next(x));
  },
  error: function(err) {
    this.observers.forEach(o => o.error(err));
  },
  complete: function() {
    this.observers.forEach(o => o.complete());
  },
  observers:[],
  addObserver: function(o) {
    this.observers.push(o)
  }
}

foo$.subscribe(bridgeObserver); 

bridgeObserver.addObserver(observerA);

let observerB = {
  next: x => console.log('B next: '+ x),
  error: err => console.log(err),
  complete: () => console.log("done")
};

setTimeout( () => {
  bridgeObserver.addObserver(observerB);
}, 2000);

/*


foo$ 
---0---1---2---3---4|


bridgeObserver
---0---1---2---3---4|
   ↓
observerAに0を渡す。(next)
observerAのnextが発火。

bridgeObserver
---0---1---2---3---4|
   x   ↓
observerAに1を渡す。(next)
observerAのnextが発火。
AND
observerBに1を渡す。(next)
observerBのnextが発火。



#NOTE
subscribeが増えるとストリームが増える。
今回の場合はストリームは1本で、それが異なるオブザーバーへ流れている。



実行結果

​​​​​A next: 0​​​​​

​​​​​A next: 1​​​​​

​​​​​B next: 1​​​​​

​​​​​A next: 2​​​​​

​​​​​B next: 2​​​​​

​​​​​A next: 3​​​​​

​​​​​B next: 3​​​​​

​​​​​A next: 4​​​​​

​​​​​B next: 4​​​​​

​​​​​done​​​​​

​​​​​done​​​​​

*/

