const Rx = require('rxjs');

const initialState = 100;

const stream$ = Rx.Observable.of(2,3,4)
                    .map(x => x*100)
                    .startWith(initialState)
                    .reduce((x, y) => {
                      return x + y
                    })
                    .subscribe(
                      succ => console.log(succ)
                    )

/*

startWithは初期値のセットに使う。

scanとreduceの違い。
scan : 毎回の実行結果をストリームに流す
reduce : 最終まで実行して、その結果を返す

scan()
​​​​​100​​​​​

​​​​​300​​​​​

​​​​​600​​​​​

​​​​​1000​​​​​


reduce()
1000

 */