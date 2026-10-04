/**
 * @typedef {object} Question
 * @property {string} category Flokkur spurningar
 * @property {string} question Spurningin sjálf
 * @property {string} answer Rétt svar
 */

/**
 * @typedef {object} Result
 * @property {string} category Flokkur spurningar
 * @property {string} question Spurningin sjálf
 * @property {string} answer Svar notanda
 * @property {string} correctAnswer Rétt svar
 * @property {boolean} correct `true` ef notandi svaraði rétt
 */

/**
 * @typedef {object} Stats
 * @property {number} played Fjöldi spilaðra leikja
 * @property {number} correct Fjöldi réttra svara
 * @property {number} incorrect Fjöldi rangra svara
 */

/**
 * Stokkar fylki með Fisher-Yates. Breytir ekki upprunalega fylkinu.
 * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @template T
 * @param {T[]} array Fylki sem á að stokka
 * @returns {T[]} Nýtt, stokkað fylki
 */
export function shuffle(array) {
  const shuffled = array.slice();

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled;
}

/**
 * Velur `count` spurningar af handahófi, engin spurning er valin oftar en einu sinni.
 * @param {Question[]} questions Allar spurningar
 * @param {number} count Fjöldi spurninga sem á að velja
 * @returns {Question[]} Valdar spurningar
 */
export function pickQuestions(questions, count) {
  return shuffle(questions).slice(0, count);
}

/**
 * Athugar hvort svar sé rétt.
 * Hunsar bil í byrjun og enda og há- og lágstafi.
 * @param {string} answer Svar notanda
 * @param {string} correctAnswer Rétt svar
 * @returns {boolean} `true` ef svar er rétt
 */
export function isCorrect(answer, correctAnswer) {
  // Hér væri hægt að gera frekari æfingar til að finna út úr hvort svar sé
  // rétt, t.d.
  // - fjarlægja öll bil („annars stigs jafna“ vs „annarsstigs jafna“)
  // - hafa `correctAnswer` sem fylki af mögulegum svörum
  // - reikna lengd svars frá réttu svari með Levenshtein lengd
  return answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
}

/**
 * Býr til niðurstöður út frá spurningum og svörum notanda, í sömu röð.
 * @param {Question[]} questions Spurningar sem voru spurðar
 * @param {string[]} answers Svör notanda, í sömu röð og spurningar
 * @returns {Result[]} Niðurstöður
 */
export function createResults(questions, answers) {
  // Staðfestum ekki að fylkin séu nákvæmlega jafn löng
  // Möppum yfir spurningar, fáum þá spurningu og "index" hennar
  return questions.map((question, index) => {
    // Finnum svarið út frá index þar sem spurningar og svör í sömu röð
    const answer = answers[index] ?? '';

    // Skilum niðurstöðu hlutnum okkar
    return {
      category: question.category,
      question: question.question,
      answer,
      correctAnswer: question.answer,
      correct: isCorrect(answer, question.answer),
    };
  });
}

/**
 * Telur fjölda réttra svara í niðurstöðum.
 * @param {Result[]} results Niðurstöður
 * @returns {number} Fjöldi réttra svara
 */
export function countCorrect(results) {
  return results.filter((result) => result.correct).length;
}

/**
 * Uppfærir tölfræði með niðurstöðum úr leik. Breytir ekki `stats`.
 * @param {Stats} stats Tölfræði fyrir leik
 * @param {Result[]} results Niðurstöður leiks
 * @returns {Stats} Ný tölfræði
 */
export function updateStats(stats, results) {
  const correct = countCorrect(results);

  return {
    played: stats.played + 1,
    correct: stats.correct + correct,
    incorrect: stats.incorrect + results.length - correct,
  };
}
