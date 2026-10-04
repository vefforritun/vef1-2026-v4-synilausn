import { questions } from './lib/questions.js';
import {
  countCorrect,
  createResults,
  pickQuestions,
  updateStats,
} from './lib/quiz.js';
import {
  renderQuestion,
  renderResults,
  renderStats,
  showScreen,
} from './lib/ui.js';

/** Fasti sem segir til um hversu margar spurningar við sýnum. */
const NUMBER_OF_QUESTIONS = 4;

/**
 * Staða leiks, heldur utanum tölfræði, spurningar í núverandi leik,
 * svör notanda í núverandi leik og á hvaða spurningu við erum.
 * @type {{
 *   stats: import("./lib/quiz.js").Stats,
 *   questions: import("./lib/quiz.js").Question[],
 *   answers: string[],
 *   current: number,
 * }}
 */
const state = {
  stats: { played: 0, correct: 0, incorrect: 0 },
  questions: [],
  answers: [],
  current: 0,
};

/**
 * Byrjar nýjan leik og sýnir fyrstu spurningu.
 * @returns {void}
 */
function start() {
  state.questions = pickQuestions(questions, NUMBER_OF_QUESTIONS);
  state.answers = [];
  state.current = 0;

  // Sýnum fyrstu spurningu (array byrjar á 0),
  renderQuestion(state.questions[0], 1, state.questions.length);
  showScreen('question');
}

/**
 * Klárar leik, uppfærir tölfræði og sýnir niðurstöður.
 * @returns {void}
 */
function finish() {
  const results = createResults(state.questions, state.answers);
  state.stats = updateStats(state.stats, results);

  renderResults(results, countCorrect(results));
  showScreen('results');
}

/**
 * Vistar svar við núverandi spurningu og sýnir næstu, eða niðurstöður ef
 * öllum spurningum hefur verið svarað.
 * @param {string} text Svar notanda
 * @returns {void}
 */
function submitAnswer(text) {
  state.answers.push(text);
  state.current += 1;

  if (state.current >= state.questions.length) {
    finish();
    return;
  }

  renderQuestion(
    state.questions[state.current],
    state.current,
    state.questions.length,
  );
}

/**
 * Fer aftur á upphafsskjá með uppfærðri tölfræði.
 * @returns {void}
 */
function restart() {
  renderStats(state.stats);
  showScreen('start');
}

function initialize() {
  const startButton = document.querySelector('.start-button');
  const form = document.querySelector('.answer-form');
  const restartButton = document.querySelector('.restart-button');

  if (!startButton || !(form instanceof HTMLFormElement) || !restartButton) {
    console.error('missing elements');
    return;
  }

  startButton.addEventListener('click', start);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    submitAnswer(String(formData.get('answer') ?? ''));
  });

  restartButton.addEventListener('click', restart);

  renderStats(state.stats);
  showScreen('start');
}

initialize();
