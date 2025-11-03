const express = require('express');
const router = express.Router();

const questions = [
  {
    step: 0,
    type: "multiple",
    question: "Quelle est la capitale des Etats-Unis ?",
    options: ["New-York", "Los Angeles", "Washington", "Miami"],
    correctAnswer: "Washington",
  },
  {
    step: 1,
    type: "open",
    question: "Combien font 100 - 50 ",
    correctAnswer: "50",
  },
  {
    step: 2,
    type: "success",
    message: "Félicitations, vous avez terminé le quiz !",
  },
];


router.get('/check', (req, res) => { // route specifique
  console.log("Requête reçue :", req.query);
  const step = parseInt(req.query.step);
  const answer = req.query.answer;

  if (isNaN(step)) {
    return res.status(400).json({ error: "Etape invalide" });
  }
  if (!answer) {
    return res.status(400).json({ error: "La réponse est obligatoire" });
  }

  const question = questions[step];
  if (!question) {
    return res.status(404).json({ error: "Question non trouvée" });
  }

  const isCorrect =
    question.correctAnswer.toLowerCase().trim() ===
    answer.toLowerCase().trim();

  return res.status(200).json({ data: isCorrect });
});

// Route pour récupérer la question
router.get('/:step', (req, res) => { // route dynamique
  const step = parseInt(req.params.step);

  if (isNaN(step)) {
    return res.status(400).json({ error: "Etape invalide" });
  }

  const question = questions[step];

  if (!question) {
    return res.status(404).json({ error: "Question non trouvée" });
  }

  res.status(200).json({ data: question });
});

module.exports = router;
