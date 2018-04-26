const Rx = require('rxjs');

const initialState = 100;

const stream$ = Rx.Observable.of(2,3,4)
                    .switchMap(n => Rx.Observable.timer(n*1000).mapTo(n))
                    .subscribe(
                      succ => console.log(succ)
                    )

/*
switchMap, mergeMap, 
Observableを受けて、Observableを返す。


*/