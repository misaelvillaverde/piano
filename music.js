// Tone.Synth is a basic synthesizer with a single oscillator
const synth = new Tone.PolySynth().toDestination();
synth.volume.value = -6;

const sampler = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  release: 1,
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

const notes = {};

// nord palette
const colors1 = ["#B48EAD", "#81A1C1", "#EBCB8B", "#88C0D0"];
const colors2 = ["#BF616A", "#D08770", "#5E81AC", "#A3BE8C"];
const colors = colors1.concat(colors2);
colors.push("#434C5E");

piano.addEventListener("mousedown", (e) => {
  const key = document.getElementById(e.target.id);
  let color = Math.floor(Math.random() * 4);
  if (key) {
    const note = key.dataset.note;
    if (!notes[note]) {
      sampler.triggerAttack(note);
      notes[note] = true;
      key.classList.contains("key")
        ? (key.style.background = colors1[color])
        : (key.style.background = colors2[color]);
    }
  }
});

piano.addEventListener("mouseup", (e) => {
  const key = document.getElementById(e.target.id);
  if (key) {
    const note = key.dataset.note;
    if (notes[note]) {
      sampler.triggerRelease(note);
      notes[note] = false;
    }
    key.classList.contains("key")
      ? (key.style.background = "#D8DEE9")
      : (key.style.background = "#434C5E");
  }
});

// handles keyboard events
document.addEventListener("keydown", (e) => {
  const key = document.getElementById(e.key);
  let color = Math.floor(Math.random() * 4);
  if (key) {
    const note = key.dataset.note;
    if (!notes[note]) {
      sampler.triggerAttack(note, Tone.now(), 0.5);
      notes[note] = true;
      key.className == "key"
        ? (key.style.background = colors1[color])
        : (key.style.background = colors2[color]);
    }
  }
});

document.addEventListener("keyup", (e) => {
  const key = document.getElementById(e.key);
  if (key) {
    const note = key.dataset.note;
    if (notes[note]) {
      sampler.triggerRelease(note);
      notes[note] = false;
    }
    key.className == "key"
      ? (key.style.background = "#D8DEE9")
      : (key.style.background = "#434C5E");
  }
});

// background changing stuff
const changeBg = () => {
  window.setTimeout(() => {
    const color = Math.floor(Math.random() * 9);
    document.body.style.background = colors[color];
    changeBg();
  }, 2000);
};
// changeBg();
