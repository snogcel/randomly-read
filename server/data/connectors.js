const Sequelize = require('sequelize');

const database = new Sequelize('worddb','stuttered','E]]q2u6xGPUvy[\?', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false,
    freezeTableName: true
});

database.define('initial', {
    id: {type: Sequelize.INTEGER},
    cmudict_id: {type: Sequelize.INTEGER},
    wordid: {type: Sequelize.INTEGER, primaryKey: true},
    lexeme: {type: Sequelize.STRING},
    consonant: {type: Sequelize.STRING},
    vowel: {type: Sequelize.STRING},
    type: {type: Sequelize.STRING},
    subtype: {type: Sequelize.STRING},
    stress: {type: Sequelize.INTEGER},
    syllables: {type: Sequelize.INTEGER}
},{
    timestamps: false,
    tableName: 'wordlist_initial'
});

database.define('medial', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    cmudict_id: {type: Sequelize.INTEGER},
    wordid: {type: Sequelize.INTEGER},
    lexeme: {type: Sequelize.STRING},
    consonant: {type: Sequelize.STRING},
    vowel: {type: Sequelize.STRING},
    type: {type: Sequelize.STRING},
    subtype: {type: Sequelize.STRING},
    stress: {type: Sequelize.INTEGER},
    syllables: {type: Sequelize.INTEGER}
},{
    timestamps: false,
    tableName: 'wordlist_medial'
});

database.define('final', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    cmudict_id: {type: Sequelize.INTEGER},
    wordid: {type: Sequelize.INTEGER},
    lexeme: {type: Sequelize.STRING},
    consonant: {type: Sequelize.STRING},
    vowel: {type: Sequelize.STRING},
    type: {type: Sequelize.STRING},
    subtype: {type: Sequelize.STRING},
    stress: {type: Sequelize.INTEGER},
    syllables: {type: Sequelize.INTEGER}
},{
    timestamps: false,
    tableName: 'wordlist_final'
});

database.define('wordsXsensesXsynsets', {
    synsetid: {type: Sequelize.INTEGER, primaryKey: true},
    wordid: {type: Sequelize.INTEGER},
    lemma: {type: Sequelize.STRING},
    casedwordid: {type: Sequelize.INTEGER},
    senseid: {type: Sequelize.INTEGER},
    sensenum: {type: Sequelize.INTEGER},
    lexid: {type: Sequelize.INTEGER},
    tagcount: {type: Sequelize.INTEGER},
    sensekey: {type: Sequelize.STRING},
    pos: {type: Sequelize.STRING},
    lexdomainid: {type: Sequelize.INTEGER},
    definition: {type: Sequelize.STRING},
},{
    timestamps: false,
    tableName: 'wordsXsensesXsynsets'
});

const Word = {
    initial: database.models.initial,
    medial: database.models.medial,
    final: database.models.final,
    wordsXsensesXsynsets: database.models.wordsXsensesXsynsets
};

Word['initial'].hasMany(Word['wordsXsensesXsynsets'], {foreignKey: 'wordid'});
Word['wordsXsensesXsynsets'].belongsTo(Word['initial'], {foreignKey: 'wordid'});

module.exports = Word;
