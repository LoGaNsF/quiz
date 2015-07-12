var models = require('../models/models');

// Autoload
exports.load = function(req, res, next, commentId) {
	models.Comment.find({
		where: {
			id: Number(commentId)
		},
	})
	.then(function(comment) {
		if (comment) {
			req.comment = comment;
			next();
		} else {
			next(new Error('No existe el commentId ' + commentId));
		}
	})
	.catch(function(error) {
		next(error);
	});
};

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

// PUT /quizes/:quizId/comments/:commentId/publish
exports.publish = function(req, res) {
	req.comment.publish = true;

	req.comment.save({fields: ["publish"]}).then(function() {
		res.redirect('/quizes/' + req.params.quizId);
	})
	.catch(function(error) {
		next(error);
	});
};