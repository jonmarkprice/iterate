const LIMIT =  10;

function* iterate(f, x) {
  let i = 0;
  while (i < LIMIT) {
    yield iterateN(i, f, x);
    i++;
  }
}

function iterateN(n, f, x) {
  let last = x;
  for (let i = 0; i < n; i += 1) {
    last = f(last);
  }
  return last;
}

console.log(iterateN(0, x => x + 1, 0))
console.log(iterateN(1, x => x + 1, 0))
console.log(iterateN(5, x => x + 1, 0))

console.log(iterateN(0, x => x*x, 0))
console.log(iterateN(0, x => x*x, 0))
console.log(iterateN(2, x => x*x, 0))
console.log(iterateN(2, x => x*x, 2))

console.log(iterate(x => x + 1, 0))

function take(n, it) {
  let a = [];
  for (let i = 0; i < n; i += 1) {
    a.push(it.next().value);
  }
  return a;
}

console.log(take(3, iterate(x => x+1, 0)))

// opt. limit
function lastWhere(pred, it, limit = Infinity) {
  let i = 0;
  let cur = it.next().value;
  let last;
  while (pred(cur)) {
    console.log('lastWhere: ', cur);
    last = cur;
    cur = it.next().value;
    
    i += 1;
    if (i >= limit) return undefined;
  }
  return last;
}

// TODO: could also define firstWhere, which would be simpler

console.log(lastWhere(x => x < 100, iterate(x => 2*x, 2), 10))

function firstWhere(pred, it, limit = Infinity) {
  let i = 0;
  let cur = it.next().value;
  while (i < limit) {
    console.log('firstWhere: ', cur);
    if (pred(cur)) return cur;

    cur = it.next().value;
    i += 1;
  }
  return undefined;
}

// TODO: rather than make lastWhere, firstWhere take a limit,
// give iterate a limit, and deal with the case where this is on next!

console.log(firstWhere(x => x > 100, iterate(x => 2*x, 1)))
