// Import stylesheets
import './style.css';
screenLog.init()

import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';
import { range } from 'rxjs/observable/range';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { filter, withLatestFrom, map, shareReplay, debounceTime, skip, take, concat, merge, tap, startWith, bufferWhen, buffer, zip, delay, delayWhen } from 'rxjs/operators';
import { pipe } from 'rxjs';

attempt2();

function attempt2() {
  //timerOne emits first value at 1s, then once every 4s
  // const source = of(null).pipe(concat(timer(1000, 1000)), shareReplay());
  // const source = timer(1000, 1000).pipe(shareReplay(), take(10));
  const source = range(1, 30)
    .pipe(
    delayWhen((i) => {
      // console.log(10 * i * i);
      return timer(10 * i * i);
    }),
    shareReplay());

  let filtered = source.pipe( 
    // pipe(pipe(pipe(
      filter((x => x % 2 == 0)),
    // )))
    // take(5)
    // skip(2)
    debounceTime(500)
  );


  //when one timer emits, emit the latest values from each timer as an array
  // const combined = combineLatest(filtered.pipe(startWith(undefined)), source);
  // const combined = source.pipe(withLatestFrom(filtered.pipe(startWith(undefined))));
  //const combined = filtered.pipe(startWith(undefined)).pipe(withLatestFrom(source));

  // filtered = of(undefined).pipe(merge(filtered));
  // const combined = filtered.pipe(withLatestFrom(source));
  const combined = source.pipe(buffer(filtered), zip(filtered));

  //source.subscribe((x) => console.log(`Source: ${x}`));
  //filtered.subscribe((x) => console.log(`Filtered: ${x}`));
  combined.subscribe((x) => console.log(x));

  /*
  const subscribe = combined
    .pipe(
    tap((x) => console.log(`combined: ${x}`)),
    filter(([a, b]) => a !== b),
    map(([a, b]) => a)
    )
    .subscribe((x) => console.log(`Excluded Value: ${x}`));


  const subscribe = combined
    .pipe(
      filter(([a, b]) => a !== b),
      map(([a, b]) => a)
    )
    .subscribe(
    ([timerValOne, timerValTwo]) => {
      console.log(
        `Timer One Latest: ${timerValOne},
      Timer Two Latest: ${timerValTwo}`
      );
    }
    );
  */
}

function attempt1() {
  //timerOne emits first value at 1s, then once every 4s
  // const source = of(null).pipe(concat(timer(1000, 1000)), shareReplay());
  const source = timer(1000, 1000).pipe(shareReplay(), take(10));
  /*const source = timer(1000, 1000).pipe(
    merge(timer(1000, 2500)), 
    map((v, i) => i),
    shareReplay());
  */
  let filtered = source.pipe(
    // filter((x => x % 2 == 0)),
    // take(5)
    skip(2)
    // debounceTime(500)
  );


  //when one timer emits, emit the latest values from each timer as an array
  // const combined = combineLatest(filtered.pipe(startWith(undefined)), source);
  // const combined = source.pipe(withLatestFrom(filtered.pipe(startWith(undefined))));
  //const combined = filtered.pipe(startWith(undefined)).pipe(withLatestFrom(source));

  filtered = of(undefined).pipe(merge(filtered));
  //const combined = filtered.pipe(withLatestFrom(source));
  const combined = source.pipe(withLatestFrom(filtered));

  source.subscribe((x) => console.log(`Source: ${x}`));
  filtered.subscribe((x) => console.log(`Filtered: ${x}`));

  const subscribe = combined
    .pipe(
    tap((x) => console.log(`combined: ${x}`)),
    filter(([a, b]) => a !== b),
    map(([a, b]) => a)
    )
    .subscribe((x) => console.log(`Excluded Value: ${x}`));

  /*

  const subscribe = combined
    .pipe(
      filter(([a, b]) => a !== b),
      map(([a, b]) => a)
    )
    .subscribe(
    ([timerValOne, timerValTwo]) => {
      console.log(
        `Timer One Latest: ${timerValOne},
      Timer Two Latest: ${timerValTwo}`
      );
    }
    );
  */
}
