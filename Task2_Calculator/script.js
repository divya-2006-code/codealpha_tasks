const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const historyList = document.getElementById("historyList");

const themeToggle = document.getElementById("themeToggle");
const clearHistoryBtn = document.getElementById("clearHistory");

// Load history from localStorage
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.prepend(li);
  });
}

renderHistory();

// Safe calculation
function calculate(expr) {
  try {
    return Function("return " + expr)();
  } catch {
    return "Error";
  }
}

// Save history
function saveHistory(item) {
  history.push(item);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
}

// Button logic
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;

    if (value === "C") {
      display.value = "";
    }

    else if (value === "DEL") {
      display.value = display.value.slice(0, -1);
    }

    else if (value === "=") {
      const result = calculate(display.value);
      saveHistory(`${display.value} = ${result}`);
      display.value = result;
    }

    else {
      display.value += value;
    }
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {

  if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
    display.value += e.key;
  }

  if (e.key === "Enter") {
    const result = calculate(display.value);
    saveHistory(`${display.value} = ${result}`);
    display.value = result;
  }

  if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }

  if (e.key === "Escape") {
    display.value = "";
  }
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Clear history
clearHistoryBtn.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("calcHistory");
  renderHistory();
});