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
		res.render('quizes/index', {quizes: quizes, errors: []});
	})
	.catch(function(error) {
		next(error);
	});
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var result = 'Incorrecto';
	if (req.query.answer === req.quiz.answer) {
		result = 'Correcto';
	}

	res.render('quizes/answer', {quiz: req.quiz, answer: result, errors: []});
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build();

	res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate().then(function(err) {
		if (err) {
			res.render('quizes/new', {quiz: quiz, errors: err.errors})
		} else {
			quiz.save({fields: ["question", "answer", "theme"]}).then(function() {
				res.redirect('/quizes');
			});
		}
	});
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
	var quiz = req.quiz;

	res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
	req.quiz.question = req.body.quiz.question;
	req.quiz.answer = req.body.quiz.answer;
	req.quiz.theme = req.body.quiz.theme;

	req.quiz.validate().then(function(err) {
		if (err) {
			res.render('quizes/edit', {quiz: req.quiz, errors: err.errors})
		} else {
			req.quiz.save({fields: ["question", "answer", "theme"]}).then(function() {
				res.redirect('/quizes');
			});
		}
	});
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
	req.quiz.destroy().then(function() {
		res.redirect('/quizes');
	})
	.catch(function(error) {
		next(error);
	});
};