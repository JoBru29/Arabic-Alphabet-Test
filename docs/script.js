const letters = [
  {
    letter: 'أ',
    image: 'https://raw.githubusercontent.com/JoBru29/Arabic-Alphabet-Test/main/docs/Arabic%20Letters/Alphabet/alif.png',
    correctOptionImage: 'https://raw.githubusercontent.com/JoBru29/Arabic-Alphabet-Test/main/docs/right%20answer.gif',
    correctFeedbackGif: 'https://raw.githubusercontent.com/JoBru29/Arabic-Alphabet-Test/main/docs/right%20answer.gif',
    incorrectFeedbackGif: 'https://raw.githubusercontent.com/JoBru29/Arabic-Alphabet-Test/main/docs/right%20answer.gif',
  },
  {
    letter: 'ب',
    image: 'https://raw.githubusercontent.com/JoBru29/Arabic-Alphabet-Test/main/docs/Arabic%20Letters/Alphabet/baa.png',
    correctOptionImage: 'https://raw.githubusercontent.com/JoBru29/Arabic-Alphabet-Test/main/docs/right%20answer.gif',
    correctFeedbackGif: 'https://raw.githubusercontent.com/JoBru29/Arabic-Alphabet-Test/main/docs/right%20answer.gif',
    incorrectFeedbackGif: 'https://raw.githubusercontent.com/JoBru29/Arabic-Alphabet-Test/main/docs/right%20answer.gif',
  },
  {
    letter: 'ت',
    image: 'https://raw.githubusercontent.com/JoBru29/Arabic-Alphabet-Test/main/docs/Arabic%20Letters/Alphabet/taa.png',
    correctOptionImage: 'https://raw.githubusercontent.com/JoBru29/Arabic-Alphabet-Test/main/docs/right%20answer.gif',
    correctFeedbackGif: 'https://raw.githubusercontent.com/JoBru29/Arabic-Alphabet-Test/main/docs/right%20answer.gif',
    incorrectFeedbackGif: 'https://raw.githubusercontent.com/JoBru29/Arabic-Alphabet-Test/main/docs/right%20answer.gif',
  },

  // Add more letters and options as needed
];

let correctAnswers = 0;
let incorrectAnswers = 0;
const totalQuestions = letters.length;
let currentQuestion = null;

function getRandomQuestion() {
  const availableQuestions = [...letters];
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const randomQuestion = availableQuestions.splice(randomIndex, 1)[0];

  return randomQuestion;
}

function displayQuestion() {
  currentQuestion = getRandomQuestion();

  const letterImage = document.getElementById('letter-image');
  letterImage.src = currentQuestion.image;

  const correctOptionImage = currentQuestion.correctOptionImage;
  const incorrectOptionImages = letters
    .filter((letter) => letter !== currentQuestion)
    .map((letter) => letter.image);

  const allOptionImages = [correctOptionImage, ...incorrectOptionImages];
  const shuffledOptionImages = shuffle(allOptionImages);

  const optionButtons = document.querySelectorAll('.option');
  optionButtons.forEach(function (button, index) {
    button.style.backgroundImage = `url(${shuffledOptionImages[index]})`;
    button.addEventListener('click', handleOptionClick);
  });
}

function handleOptionClick() {
  const selectedOption = this;
  const selectedOptionImage = selectedOption.style.backgroundImage;

  optionButtons.forEach(function (button) {
    button.removeEventListener('click', handleOptionClick);
  });

  if (selectedOptionImage.includes(currentQuestion.correctOptionImage)) {
    feedback.textContent = 'Correct!';
    feedback.classList.add('correct');
    feedbackGif.src = currentQuestion.correctFeedbackGif;
    feedbackGif.style.display = 'block';
    correctAnswers++;
  } else {
    feedback.textContent = 'Incorrect!';
    feedback.classList.add('incorrect');
    feedbackGif.src = currentQuestion.incorrectFeedbackGif;
    feedbackGif.style.display = 'block';
    incorrectAnswers++;
  }

  nextButton.disabled = false;
}

const nextButton = document.getElementById('next-btn');
nextButton.addEventListener('click', function () {
  feedback.textContent = '';
  feedback.classList.remove('correct', 'incorrect');
  feedbackGif.style.display = 'none';
  nextButton.disabled = true;

  if (correctAnswers + incorrectAnswers === totalQuestions) {
    showGrade(correctAnswers, totalQuestions);
  } else {
    displayQuestion();
  }
});

function showGrade(correctAnswers, totalQuestions) {
  const gradeDisplay = document.getElementById('grade');
  gradeDisplay.textContent = `Your progress: ${correctAnswers}/${totalQuestions}`;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const optionButtons = document.querySelectorAll('.option');
const feedback = document.getElementById('feedback');
const feedbackGif = document.getElementById('feedback-gif');

displayQuestion();
