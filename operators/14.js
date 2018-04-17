const Rx = require('rxjs');

/*

Title: Buffer

*/

let foo$ = Rx.Observable.of('h', 'e' , 'l', 'l', 'o' )
            .zip(Rx.Observable.interval(600).take(5), (_, x) => _);

/*
buffer
bufferCount
bufferTime
bufferToggle
bufferWhen

-----h-----e-----l-----l-----o|(foo$)
        bufferCount
-----------he----------ll----o


-----h-----e-----l-----l-----o|(foo$)
      bufferTime(900ms)
--------x--------x--------x-----
--------h--------e--------ll--o



縦じゃなくて、横方向に合成したい場合


 クリックイベントをカウントしたいりする時
----ev-------ev--ev------|
        map(ev => +1)
----1--------1---1-------|
  scan((acc, x) => acc + x, 0)
----1--------2---3-------|


*/ 



let result$ = foo$.bufferCount(2)
let result2$ = foo$.bufferTime(900)

// Same as Rx.zip(foo$, bar$, (x,y) => x + y);

function a() {
  result2$.subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('done')
  )
}

let runningFunc = a();