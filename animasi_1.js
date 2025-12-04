const phrases = [
    "Untuk Kamu dan Aku.",
    "Untuk Rasa SayangKu.",
    "Untuk Kenangan Indah.",
    "Untuk Momen Kita.",
    "Untuk Rasa Terimakasih Ku."
];

const animatedText = document.getElementById("animated-text");
let currentIndex = 0;

function showNextPhrase() {
    if (!animatedText.textContent) {
        animatedText.textContent = phrases[currentIndex];
        animatedText.classList.add("fade-up-in");
        return;
    }

    animatedText.classList.remove("fade-up-in");
    animatedText.classList.add("fade-up-out");

    animatedText.addEventListener("animationend", function handler() {
        animatedText.removeEventListener("animationend", handler);
        currentIndex = (currentIndex + 1) % phrases.length;
        animatedText.textContent = phrases[currentIndex];
        animatedText.classList.remove("fade-up-out");
        animatedText.classList.add("fade-up-in");
    });
}

showNextPhrase();

setInterval(showNextPhrase, 3000);
