const Rx = require('rxjs');

/* 

1--2--3--4--5--6--7--8--9--10

Partition

1--3--5--7--9
2--4--6--8--10

*/


const all = Rx.Observable.range(1, 10)
  .partition(data => data % 2 === 0)

all.map(x => x.subscribe(_ =>
  console.log(_)))





Rx.Observable.range(1, 10)
  .partition(data => data % 2 === 0)
  .map(x => x.subscribe(_ => console.log(_)))




const [true$, false$] = Rx.Observable.of(true, false)
  .partition(data => data)

true$.subscribe((x) => {
  console.log(x)
})

false$.subscribe((x) => {
  console.log(x)
})