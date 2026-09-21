// Nexus prototype — shared per-topic question bank.
// One question set per Nexus module id, aligned with that module's own lab content
// (output/m01-computer-basics-os/l01-l06). Used both as the final "Quiz" station appended
// to each topic module (js/modules/*.js) and by the topic-picker hub in js/modules/quiz.js.
//
// The actual questions/answers live obfuscated in js/quiz-data.enc.js (reversed Base64) so a
// TN can't just open this file / view-source and read the correct answers directly — this
// file only decodes that data into the QuizBank object every other module consumes.
const QuizBank = JSON.parse(atob(QuizDataEncoded.split("").reverse().join("")));
