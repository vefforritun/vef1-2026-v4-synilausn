import { el, empty, setText } from './elements.js';

/**
 * @typedef {"start" | "question" | "results"} Screen
 */

/**
 * Allir mögulegir skjáir.
 * @type {Screen[]}
 */
const SCREENS = ['start', 'question', 'results'];

/**
 * Sýnir skjá `name` og felur aðra.
 * @param {Screen} name Skjár sem á að sýna
 * @returns {void}
 */
export function showScreen(name) {
  for (const screen of SCREENS) {
    const element = document.querySelector(`.${screen}`);

    if (!element) {
      console.error(`screen not found: ${screen}`);
      continue;
    }

    if (screen === name) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  }
}

/**
 * Birtir tölfræði á upphafsskjá.
 * @param {import("./quiz.js").Stats} stats Tölfræði
 * @returns {void}
 */
export function renderStats(stats) {
  setText('.stats-played', String(stats.played));
  setText('.stats-correct', String(stats.correct));
  setText('.stats-incorrect', String(stats.incorrect));
}

/**
 * Birtir spurningu, tæmir svarreit og setur fókus á hann.
 * @param {import("./quiz.js").Question} question Spurning
 * @param {number} num Númer spurningar, byrjar á 1
 * @param {number} total Heildarfjöldi spurninga
 * @returns {void}
 */
export function renderQuestion(question, num, total) {
  setText('.question .current', String(num));
  setText('.question .total', String(total));
  setText('.category', question.category);
  setText('.question-text', question.question);

  const form = document.querySelector('.answer-form');

  if (!(form instanceof HTMLFormElement)) {
    console.error('answer form not found');
    return;
  }

  // Tæmum formið (bara svarreitur)
  form.reset();
  // Reynum að finna input og fókusum það
  // ?. er „optional chaining“, ef við finnum þá köllum við í fókus, annars ekki
  form.querySelector('input')?.focus();
}

/**
 * Birtir niðurstöður leiks.
 * @param {import("./quiz.js").Result[]} results Niðurstöður
 * @param {number} correctCount Fjöldi réttra svara
 * @returns {void}
 */
export function renderResults(results, correctCount) {
  // Setja upplýsingar um rétt svör og fjölda spurninga
  setText('.results .correct-count', String(correctCount));
  setText('.results .total', String(results.length));

  const list = document.querySelector('.results-list');

  if (!list) {
    console.error('results list not found');
    return;
  }

  // Tæmum lista ef þetta er ekki í fyrsta skipti sem við erum að spila
  empty(list);

  // Fyrir hverja spurningu/niðurstöðu, ítra í gegnum og búa til viðmót
  for (const result of results) {
    // Notem el hjálparfallið til að spara okkur heilmikið af „boilerplate“
    const item = el(
      'li',
      { class: result.correct ? 'result correct' : 'result incorrect' },
      el('p', { class: 'result-category' }, result.category),
      el('p', { class: 'result-question' }, result.question),
      el(
        'p',
        {},
        'Þitt svar: ',
        el('span', { class: 'result-answer' }, result.answer || 'Ekkert svar'),
      ),
      el(
        'p',
        {},
        'Rétt svar: ',
        el('span', { class: 'result-correct' }, result.correctAnswer),
      ),
    );

    list.appendChild(item);
  }
}
