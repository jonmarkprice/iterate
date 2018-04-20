const list = document.getElementById("list");

const firstPrompt = (elem) => firstWhere(
  x => (x.classList.contains("prompt") || x == document.root),
  iterate(x => x.parentElement, elem));

list.addEventListener('focusin', function(event) {
  firstPrompt(event.target).classList.add("active");
});

list.addEventListener('focusout', function(event) {
  firstPrompt(event.target).classList.remove("active");
});

/////////////////////////////////////////////////////////////////////////////////////
function* iterate(f, x) {
  let i = 0;
  while (true) {
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
