const Rx = require('rxjs');

const initialState = 100;

const stream$ = Rx.Observable.of(2,3,4)
                    .map(x => x*100)
                    .startWith(initialState)
                    .scan((x, y) => {
                      return x + y
                    })
                    .subscribe(
                      succ => console.log(succ)
                    )