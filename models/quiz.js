module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz', {
		question: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {msg: "Debe indicar una pregunta."}
			}
		},
		answer: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {msg: "Debe indicar una respuesta."}
			}
		},
		theme: {
			type: DataTypes.STRING,
			defaultValue: "otro"
		}
	});
};