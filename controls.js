// Load Piano
const piano = document.getElementById("piano");
const whiteKeys = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"];
const blackKeys = ["w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"];

// Initial State
const natural = [
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C5",
  "D5",
  "E5",
  "F5",
  "G5",
  "A5",
  "B5",
  "C6",
  "C1",
  "D1",
  "E1",
  "F1",
  "G1",
  "A1",
  "B1",
  "C2",
  "D2",
  "E2",
  "F2",
  "G2",
  "A2",
  "B2",
  "C3",
  "D3",
  "E3",
  "F3",
  "G3",
  "A3",
  "B3",
];

const altered = [
  "C#4",
  "D#4",
  "F#4",
  "G#4",
  "A#4",
  "C#5",
  "D#5",
  "F#5",
  "G#5",
  "A#5",
  "C#6",
  "C#1",
  "D#1",
  "F#1",
  "G#1",
  "A#1",
  "C#2",
  "D#2",
  "F#2",
  "G#2",
  "A#2",
  "C#3",
  "D#3",
  "F#3",
  "G#3",
  "A#3",
];

const special = [
  "C4",
  "D4",
  "F4",
  "G4",
  "A4",
  "C5",
  "D5",
  "F5",
  "G5",
  "A5",
  "C6",
  "C1",
  "D1",
  "F1",
  "G1",
  "A1",
  "C2",
  "D2",
  "F2",
  "G2",
  "A2",
  "C3",
  "D3",
  "F3",
  "G3",
  "A3",
];

const loadPiano = () => {
  let j = 0;
  piano.innerHTML = "";
  for (let i = 0; i < 11; i++) {
    const key = document.createElement("div");
    key.setAttribute("data-note", natural[i]);
    key.setAttribute("id", whiteKeys[i]);
    key.setAttribute("class", "key");
    key.innerText = whiteKeys[i].toUpperCase();
    if (special.includes(natural[i])) {
      const blackKey = document.createElement("div");
      blackKey.setAttribute("data-note", altered[j]);
      blackKey.setAttribute("id", blackKeys[i]);
      blackKey.setAttribute("class", "black-key");
      j++;
      blackKey.innerText = blackKeys[i].toUpperCase();
      key.prepend(blackKey);
    }
    piano.appendChild(key);
  }
};
loadPiano();

// Controls
const buttonLeft = document.getElementById("left");
const buttonRight = document.getElementById("right");

const shiftLeft = () => {
  const note = natural.pop();
  natural.unshift(note);
  const key = document.createElement("div");
  key.setAttribute("data-note", note);
  key.setAttribute("class", "key");
  if (special.includes(note)) {
    const anote = altered.pop();
    altered.unshift(anote);
    const blackKey = document.createElement("div");
    blackKey.setAttribute("data-note", anote);
    blackKey.setAttribute("class", "black-key");
    key.append(blackKey);
  }

  piano.lastChild.className += " shiftR";
  piano.lastChild.addEventListener("transitionend", () => {
    piano.removeChild(piano.lastChild);
    piano.prepend(key);
    loadPiano();
  });
};

const shiftRight = () => {
  const note = natural.shift();
  natural.push(note);
  const key = document.createElement("div");
  key.setAttribute("data-note", natural[10]);
  key.setAttribute("class", "key");
  if (special.includes(note)) {
    const anote = altered.shift();
    altered.push(anote);
    const blackKey = document.createElement("div");
    blackKey.setAttribute("data-note", altered[7]);
    blackKey.setAttribute("class", "black-key");
    key.append(blackKey);
  }

  piano.firstChild.className += " shiftL";
  piano.firstChild.addEventListener("transitionend", () => {
    piano.removeChild(piano.firstChild);
    piano.append(key);
    loadPiano();
  });
};

buttonLeft.addEventListener("click", () => {
  disButton();
  if (!buttonLeft.disabled) {
    shiftLeft();
  }
});

buttonRight.addEventListener("click", () => {
  disButton();
  if (!buttonRight.disabled) {
    shiftRight();
  }
});

window.addEventListener("keydown", (e) => {
  disButton();
  if (e.key === "ArrowRight" && !buttonRight.disabled) {
    // console.log("Right arrow");
    shiftRight();
  } else if (e.key === "ArrowLeft" && !buttonLeft.disabled) {
    // console.log("Left arrow");
    shiftLeft();
  }
});

const disButton = () => {
  if (natural[0] === "C1") {
    buttonLeft.disabled = true;
  } else if (natural[0] !== "C1") {
    buttonLeft.disabled = false;
  }
  if (natural[10] === "C6") {
    buttonRight.disabled = true;
  } else if (natural[10] !== "C6") {
    buttonRight.disabled = false;
  }
};
