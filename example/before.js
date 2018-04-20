const list = document.getElementById("list");

list.addEventListener('focusin', function(event) {
  findPrompt(event.target, x => x.classList.add("active"));
});

list.addEventListener('focusout', function(event) {
  findPrompt(event.target, x => x.classList.remove("active"));
});

function findPrompt(elem, action) {
  if (elem.classList.contains("prompt")) {
    action(elem);
    return;
  } else if (elem == document.body) {
    return; // abort
  } else {
    return findPrompt(elem.parentElement, action); // recur
  }
}
