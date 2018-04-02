const Rx = require('rxjs');

/*

Title: Scan

*/

let foo$ = Rx.Observable.of('h', 'e' , 'l', 'l', 'o' );
let bar$ = Rx.Observable.interval(400).take(5)

/*
(hello)--------------|
---0---1---2---3---4|
zip
---h---e---l---l---o|
scan((acc, x) => acc + x, '')
---h---(he)---(hel)---(hell)---(hello)|

縦じゃなくて、横方向に合成したい場合


 クリックイベントをカウントしたいりする時
----ev-------ev--ev------|
        map(ev => +1)
----1--------1---1-------|
  scan((acc, x) => acc + x, 0)
----1--------2---3-------|


*/ 



let combined$ = foo$.zip(bar$, (x, y) => x ).scan((acc, x, i) => acc + x + i , '');
// Same as Rx.zip(foo$, bar$, (x,y) => x + y);

function a() {
  combined$.subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('done')
  )
}

let runningFunc = a();