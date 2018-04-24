const Rx = require('rxjs');

const stream$ = Rx.Observable.of(1)
    .zip(Rx.Observable.of(2))
    .reduce((pre, curr) => pre + curr ) // 出来てない
    .subscribe(
      succ => console.log(succ)
    )