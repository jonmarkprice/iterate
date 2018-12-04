const Benchmark = require("benchmark");
////////////////////////////////////
function* iterate(f, a) {
  let x = a;
  while (true) {
    x = f(x);
    yield x;
  }
}

function until(pred, it) {
  let cur = it.next().value;
  while (pred(cur)) {
    cur = it.next().value;
  }
  return cur;
}

////////////////////////////////////
const succ = x => x + 1;
const limit = x => x < 1000; // recur failed at 10,000

function recur(pred, f, x) {
  if (pred(x)) {
    return recur(pred, f, f(x));
  } else {
    return x;
  }
}

function loop(pred, f, a) {
  let x = a;
  while (pred(x)) {
    x = f(x);
  }
  return x;
}

let results = {};

const b1 = new Benchmark('while', function() {
  results['loop'] = loop(limit, succ, 2);
});

const b2 = new Benchmark('recursive', function() {
  results['recur'] = recur(limit, succ, 2);
});

const b3 = new Benchmark('iterate', function () {
  results['iter'] = until(limit, iterate(succ, 2));
});

console.log("Running benchmarks");

console.log(b1.run().toString());
console.log(b2.run().toString());
console.log(b3.run().toString());

console.log("------");
console.log(results);