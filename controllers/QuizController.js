// Get /quizes/question
exports.question = function(req, res) {
	res.render('quizes/question', {question: 'Capital de Italia'});
};

// Get /quizes/answer
exports.answer = function(req, res) {
	if (req.query.answer === 'Roma') {
		res.render('quizes/answer', {answer: 'Correcto'});
	} else {
		res.render('quizes/answer', {answer: 'Incorrecto'});
	}
};