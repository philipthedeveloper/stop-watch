const hD = document.querySelector("h2#hours");
const mD = document.querySelector("h2#minutes");
const sD = document.querySelector("h2#seconds");
const buttons = document.querySelectorAll("button");
const minInput = document.querySelector("input#minutes");
const secInput = document.querySelector("input#seconds");

[minInput, secInput].forEach((input) => {
  input.addEventListener("change", function () {
    if (Number(this.value) > 60 || Number(this.value) < 0) {
      this.value = "";
      alert(
        input.id.toUpperCase() +
          " value cannot be greater than or less than 60."
      );
    } else if (isNaN(this.value)) {
      this.value = "";
    }
  });
});

// COLOR SETTER
let colors = ["#139213", "#2d5ae1", "#e61d1d", "#e1ba1e"];
buttons.forEach(function (value, index) {
  value.style.backgroundColor = colors[index];
});

// HIDE THE STOP BUTTON BY DEFAULT
buttons[2].style.display = "none";
buttons[1].style.display = "none";
buttons[3].style.display = "none";

// SET HOURS BY DEFAULT
let hours = 0;
let minutes = 0;
let seconds = 0;

// TO KEEP TRACK OF PAUSE, INTERVAL AND RECORD;
let pause = false;
let starting, record;

// TO START THE TIMING
function start() {
  buttons[0].style.display = "none";
  buttons[2].style.display = "block";
  buttons[1].style.display = "block";
  buttons[3].style.display = "block";

  // GET THE USER INPUT
  hours = Number(document.querySelector("input#hours").value);
  minutes = Number(document.querySelector("input#minutes").value);
  seconds = Number(document.querySelector("input#seconds").value);

  // CHECKING IF THE USER INPUTED ANYTHING
  if (!hours) {
    hours = 0;
  }

  if (!minutes) {
    minutes = 0;
  }

  if (!seconds) {
    seconds = 0;
  }

  // MAKES SURE THE OTHER BUTTONS DOESN'T APPEAR UNTIL YOU ENTET A VALID INPUT
  if (seconds == 0) {
    if (minutes == 0 && hours == 0) {
      clearInterval(starting);
      buttons[0].style.display = "block";
      buttons[2].style.display = "none";
      buttons[1].style.display = "none";
      buttons[3].style.display = "none";
      return 0;
    }
  }
  // SAVE THE USER INPUT FOR RESTART
  record = [hours, minutes, seconds];

  // RESET THE USER INPUT
  document.querySelector("input#hours").value = "";
  document.querySelector("input#minutes").value = "";
  document.querySelector("input#seconds").value = "";

  // ADD THE RESULT INTO THE H2 TAGS
  display();

  if (!pause) {
    starting = window.setInterval(decreaseSeconds, 1000);
  }
}

function decreaseSeconds() {
  if (seconds == 0) {
    if (minutes == 0 && hours == 0) {
      clearInterval(starting);
      buttons[0].style.display = "block";
      buttons[2].style.display = "none";
      buttons[1].style.display = "none";
      buttons[3].style.display = "none";
      return 0;
    }
    seconds = 59;
  } else {
    seconds--;
  }

  decreaseMinutes();
}

function decreaseMinutes() {
  if (seconds == 59) {
    if (minutes > 0) {
      minutes--;
    } else if (minutes == 0) {
      if (hours > 0) {
        hours--;
        minutes = 59;
      } else if (hours == 0) {
        hours = 0;
        minutes = 0;
      }
    }
  }

  display();
}

function toggle(value) {
  if (!pause) {
    pause = true;
    value.innerHTML = "RESUME";
    clearInterval(starting);
  } else {
    pause = false;
    value.innerHTML = "PAUSE";
    starting = window.setInterval(decreaseSeconds, 1000);
  }
}

function stoper() {
  buttons[2].style.display = "none";
  buttons[0].style.display = "block";
  hours = 0;
  minutes = 0;
  seconds = 0;

  record = [hours, minutes, seconds];

  display();

  if (seconds == 0) {
    if (minutes == 0 && hours == 0) {
      clearInterval(starting);
      buttons[0].style.display = "block";
      buttons[2].style.display = "none";
      buttons[1].style.display = "none";
      buttons[3].style.display = "none";
      return 0;
    }
  }

  clearInterval(starting);
}

function restart() {
  [hours, minutes, seconds] = record;

  display();

  if (!pause) {
    clearInterval(starting);
    starting = window.setInterval(decreaseSeconds, 1000);
  } else {
    pause = false;
    clearInterval(starting);
    starting = window.setInterval(decreaseSeconds, 1000);
  }
}

function display() {
  if (hours < 10) {
    hD.innerHTML = "0" + hours;
  } else {
    hD.innerHTML = hours;
  }
  if (minutes < 10) {
    mD.innerHTML = "0" + minutes;
  } else {
    mD.innerHTML = minutes;
  }
  if (seconds < 10) {
    sD.innerHTML = "0" + seconds;
  } else {
    sD.innerHTML = seconds;
  }
}
