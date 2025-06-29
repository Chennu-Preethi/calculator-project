// Get references
const display = document.querySelector('input[name="display"]');
const buttons = document.querySelectorAll('input[type="button"]');

// Typing animation text
const nameToType = "Chennu Preethi";
let index = 0;
let typingStopped = false;
let typingTimer;

// Function to start typing one character at a time
function typeName() {
    if (typingStopped) return;

    if (index < nameToType.length) {
        display.value += nameToType.charAt(index);
        index++;
        typingTimer = setTimeout(typeName, 120);
    } else {
        index = 0;
        setTimeout(() => {
            if (!typingStopped) {
                display.value = '';
                typingTimer = setTimeout(typeName, 500);
            }
        }, 1000);
    }
}

// Stop typing animation
function stopTyping(preserveDisplay = false) {
    if (!typingStopped) {
        typingStopped = true;
        clearTimeout(typingTimer);
        if (!preserveDisplay) display.value = '';
    }
}

// Restart typing animation
function startTyping() {
    typingStopped = false;
    index = 0;
    typeName();
}

// Append number or operator to display
function appendToDisplay(value) {
    stopTyping();
    display.value += value;
}

// Clear display and restart typing
function clearDisplay() {
    stopTyping(true);
    display.value = '';
    setTimeout(() => {
        startTyping();
    }, 300);
}

// Delete last character
function delChar() {
    stopTyping();
    display.value = display.value.toString().slice(0, -1);
}

// Evaluate the expression
function calculate() {
    stopTyping();
    try {
        display.value = eval(display.value);
        setTimeout(() => {
            display.value = '';
            startTyping();
        }, 155000000);
    } catch {
        display.value = "Error";
        setTimeout(() => {
            display.value = '';
            startTyping();
        }, 155000000);
    }
}

// Square the evaluated value
function square() {
    stopTyping();
    try {
        const value = eval(display.value);
        display.value = value ** 2;
        setTimeout(() => {
            display.value = '';
            startTyping();
        }, 2000000);
    } catch {
        display.value = "Error";
        setTimeout(() => {
            display.value = '';
            startTyping();
        }, 2000000);
    }
}

// Toggle dark/light mode
function toggleTheme() {
    document.body.classList.toggle("dark");
}

// Start typing on load
window.onload = () => {
    display.value = '';
    startTyping();
};

// Stop typing on any button press
buttons.forEach(btn => {
    btn.addEventListener("click", stopTyping);
});

// Stop typing on keypress (optional)
document.addEventListener("keydown", stopTyping);
