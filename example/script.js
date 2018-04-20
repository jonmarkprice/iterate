// maybe use data attributes too....
const list = document.getElementById("list");

list.addEventListener('focusin', function(event) {
  findPrompt(event.target, x => x.classList.add("active"));
    /*function(x) {
    console.log(this);
    console.log(x)
    console.log(x.classList)
    x.classList.add("active");
    console.log(x.classList)
  });*/
});

list.addEventListener('focusout', function(event) {
  findPrompt(event.target, x => x.classList.remove("active"));
});

/*
list.addEventListener('focusout', function(event) {
  // const parent = event.target.parentElement;
  // if (parent.classList.contains("prompt")) {
  if (event.target, x => x.classList.remove("prompt")) {
    event.ta.classList.remove("active");
    // event.stopPropagation(); // or just focus
  }
});*/

function findPrompt(elem, action) {
  console.log('.');
  if (elem.classList.contains("prompt")) {
    // found
    console.log(this)
    console.log("found", elem)
    // console.log(elem.classList)
    action(elem);
    // console.log(elem.classList)
    return;
  } else if (elem == this || elem == document.body) {
    // abort
    console.log("aborting")
    return;
  } else {
    // recur
    // return findPrompt(elem.parentElement, action);

    // use:
    const elem = firstWhere(
      x => x.classList.contains("prompt"), // or x == document.root
      iterate(x => x.parentElement, event.target)
    );
    elem.classList.add("active");
  }
}

// list.addEventListener('click', function() { alert("HI"); });
// one.addEventListener('focus', function() { alert("ME"); });


function* iterateMax(f, x, limit) {
  let i = 0;
  while (i < limit) {
    yield iterateN(i, f, x);
    i++;
  }
}

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
