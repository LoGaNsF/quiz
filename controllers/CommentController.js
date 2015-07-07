var models = require('../models/models');

// GET /quizes/:id/comments/new
exports.new = function(req, res) {
	res.render('comments/new', {quizId: req.params.quizId, errors: []});
};

// POST /quizes/:id/comments
exports.create = function(req, res) {
	var comment = models.Comment.build({
		text: req.body.comment.text,
		QuizId: req.params.quizId
	});

	comment.validate().then(function(err) {
		if (err) {
			res.render('comments/new', {comment: comment, quizId: req.params.quizId, errors: err.errors})
		} else {
			comment.save().then(function() {
				res.redirect('/quizes/' + req.params.quizId);
			});
		}
	})
	.catch(function(error) {
		next(error);
	});
};