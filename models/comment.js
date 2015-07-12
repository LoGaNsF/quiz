module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Comment', {
		text: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {msg: "Debe indicar un comentario."}
			}
		},
		publish: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});
};