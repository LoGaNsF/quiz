var path = require('path');

// Parametros DB
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name		= (url[6]||null);
var user		= (url[2]||null);
var pwd			= (url[3]||null);
var protocol	= (url[1]||null);
var dialect		= (url[1]||null);
var port		= (url[5]||null);
var host		= (url[4]||null);
var storage		= process.env.DATABASE_STORAGE;

// Cargar ORM
var Sequelize = require('sequelize');

// Cargar modelo
var sequelize = new Sequelize(DB_name, user, pwd, {
	dialect: dialect,
	protocol: protocol,
	port: port,
	host: host,
	storage: storage,
	omitNull: true
});

// Tabla Quiz
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comment'));

// Relaciones
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;
exports.Comment = Comment;

// Crea e inicializa la tabla de preguntas
sequelize.sync().then(function() {
	Quiz.count().then(function(count) {
		if (count == 0) {
			Quiz.bulkCreate([
				{question: 'Capital de Italia', answer: 'Roma', theme: 'humanidades'},
				{question: 'Capital de Portugal', answer: 'Lisboa', theme: 'humanidades'},
				{question: 'Capital de España', answer: 'Madrid', theme: 'humanidades'}
			])
			.then(function() {
				console.log("Base de datos inicializada.");
			});
		}
	});
});