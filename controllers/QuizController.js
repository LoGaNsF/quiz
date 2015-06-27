var models = require('../models/models');

// Autoload
exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(function(quiz) {
		if (quiz) {
			req.quiz = quiz;
			next();
		} else {
			next(new Error('No existe el quiz ' + quizId));
		}
	}).catch(function(error) {
		next(error);
	});
};

// Get /quizes
exports.index = function(req, res) {
	var options = {};
	if(req.query.search){
		var search = '%' + req.query.search.replace(' ', '%') + '%';
		options.where = {question: {$like: search}}
	}

	models.Quiz.findAll(options).then(function(quizes) {
		res.render('quizes/index', {quizes: quizes});
	})
	.catch(function(error) {
		next(error);
	});
};

// Get /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz});
};

// Get /quizes/:id/answer
exports.answer = function(req, res) {
	var result = 'Incorrecto';
	if (req.query.answer === req.quiz.answer) {
		result = 'Correcto';
	}

	res.render('quizes/answer', {quiz: req.quiz, answer: result});
};