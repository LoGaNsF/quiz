var express = require('express');
var router = express.Router();

var quizController = require('../controllers/QuizController');
var commentController = require('../controllers/CommentController');

/* Home */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Quiz', errors: []});
});

/* Author */
router.get('/author', function(req, res, next) {
  res.render('author', {errors: []});
});

/* Autoload */
router.param('quizId', quizController.load);

/* Quizes */
router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
router.get('/quizes/new',				 	quizController.new);
router.post('/quizes/create',			 	quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', 	quizController.edit);
router.put('/quizes/:quizId(\\d+)', 		quizController.update);
router.delete('/quizes/:quizId(\\d+)', 		quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new',	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', 		commentController.create);

module.exports = router;
