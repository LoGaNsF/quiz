var express = require('express');
var router = express.Router();

var quizController = require('../controllers/QuizController');

/* Home */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

/* Author */
router.get('/author', function(req, res, next) {
  res.render('author');
});

/* Autoload */
router.param('quizId', quizController.load);

/* Quizes */
router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
router.get('/quizes/new',				 	quizController.new);
router.post('/quizes/create',			 	quizController.create);

module.exports = router;
