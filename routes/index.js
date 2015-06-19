var express = require('express');
var router = express.Router();

var quizController = require('../controllers/QuizController');

/* Home */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

/* Quizes */
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;
