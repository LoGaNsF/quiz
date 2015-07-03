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

// GET /quizes
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

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var result = 'Incorrecto';
	if (req.query.answer === req.quiz.answer) {
		result = 'Correcto';
	}

	res.render('quizes/answer', {quiz: req.quiz, answer: result});
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build({
		question: 'Pregunta',
		answer: 'Respuesta',
		theme: 'otro'
	});

	res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.save({fields: ["question", "answer", "theme"]}).then(function() {
		res.redirect('/quizes');
	});
};