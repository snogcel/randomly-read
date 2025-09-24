"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordService = void 0;
const Word_1 = require("../models/Word");
const logger_1 = require("../utils/logger");
const config_1 = require("../config");
class WordService {
    static getInstance() {
        if (!WordService.instance) {
            WordService.instance = new WordService();
        }
        return WordService.instance;
    }
    async queryWords(options) {
        try {
            const filter = this.buildWordFilter(options);
            const limit = Math.min(options.limit || config_1.config.wordDatabase.defaultLimit, config_1.config.wordDatabase.maxQueryLimit);
            logger_1.logger.info('Querying words with filter:', { filter, limit });
            const totalCount = await Word_1.Word.countDocuments(filter);
            const words = await Word_1.Word.aggregate([
                { $match: filter },
                { $sample: { size: limit } },
                { $lookup: {
                        from: 'users',
                        localField: 'votes.user',
                        foreignField: '_id',
                        as: 'voteUsers'
                    } },
                { $project: {
                        cmudict_id: 1,
                        wordid: 1,
                        lexeme: 1,
                        consonant: 1,
                        vowel: 1,
                        type: 1,
                        subtype: 1,
                        stress: 1,
                        syllables: 1,
                        position: 1,
                        age_of_acquisition: 1,
                        wordsXsensesXsynsets: 1,
                        score: 1,
                        votes: 1,
                        views: 1,
                        upvotePercentage: {
                            $cond: {
                                if: { $eq: [{ $size: '$votes' }, 0] },
                                then: 0,
                                else: {
                                    $multiply: [
                                        { $divide: [
                                                { $size: { $filter: {
                                                            input: '$votes',
                                                            cond: { $eq: ['$$this.vote', 1] }
                                                        } } },
                                                { $size: '$votes' }
                                            ] },
                                        100
                                    ]
                                }
                            }
                        }
                    } }
            ]);
            return {
                words,
                totalCount,
                hasMore: totalCount > limit
            };
        }
        catch (error) {
            logger_1.logger.error('Error querying words:', error);
            throw new Error('Failed to query words');
        }
    }
    async getRandomWord(options) {
        try {
            const result = await this.queryWords({ ...options, limit: 1 });
            return result.words[0] || null;
        }
        catch (error) {
            logger_1.logger.error('Error getting random word:', error);
            throw new Error('Failed to get random word');
        }
    }
    async getWordById(id) {
        try {
            return await Word_1.Word.findById(id);
        }
        catch (error) {
            logger_1.logger.error('Error getting word by ID:', error);
            throw new Error('Failed to get word');
        }
    }
    async voteOnWord(wordId, userId, vote) {
        try {
            const word = await Word_1.Word.findById(wordId);
            if (!word) {
                throw new Error('Word not found');
            }
            return await word.vote(userId, vote);
        }
        catch (error) {
            logger_1.logger.error('Error voting on word:', error);
            throw new Error('Failed to vote on word');
        }
    }
    async incrementWordViews(wordId) {
        try {
            const word = await Word_1.Word.findById(wordId);
            if (!word) {
                throw new Error('Word not found');
            }
            return await word.incrementViews();
        }
        catch (error) {
            logger_1.logger.error('Error incrementing word views:', error);
            throw new Error('Failed to increment word views');
        }
    }
    async getWordsForSentence(options) {
        try {
            const filter = this.buildWordFilter({
                ...options,
                type: ['noun', 'adj']
            });
            const dataLimit = Math.min(options.limit || 100, 250);
            const words = await Word_1.Word.find(filter)
                .limit(dataLimit)
                .sort({ score: -1 });
            const nouns = words.filter(word => word.type === 'noun');
            const adjectives = words.filter(word => word.type === 'adj');
            const filteredNouns = {
                animal: nouns.filter(word => word.subtype === 'animal'),
                location: nouns.filter(word => word.subtype === 'location'),
                person: nouns.filter(word => word.subtype === 'person'),
                food: nouns.filter(word => word.subtype === 'food'),
                artifact: nouns.filter(word => word.subtype === 'artifact')
            };
            return {
                nouns,
                adjectives,
                filteredNouns
            };
        }
        catch (error) {
            logger_1.logger.error('Error getting words for sentence:', error);
            throw new Error('Failed to get words for sentence generation');
        }
    }
    buildWordFilter(options) {
        const filter = {};
        if (options.vowel && options.vowel.length > 0) {
            filter.vowel = { $in: options.vowel };
        }
        if (options.consonant && options.consonant.length > 0) {
            filter.consonant = { $in: options.consonant };
        }
        if (options.position) {
            filter.position = options.position;
        }
        if (options.type && options.type.length > 0) {
            filter.type = { $in: options.type };
        }
        if (options.subtype && options.subtype.length > 0) {
            filter.subtype = { $in: options.subtype };
        }
        if (options.syllables && options.syllables.length > 0) {
            filter.syllables = { $in: options.syllables };
        }
        else {
            filter.syllables = { $in: [1, 2, 3, 4, 5] };
        }
        if (options.age && options.age !== '0') {
            filter.age_of_acquisition = {
                $gt: 0,
                $lte: parseInt(options.age, 10)
            };
        }
        return filter;
    }
    async getPhoneticStats(userId) {
        try {
            return {
                consonantAccuracy: {},
                vowelAccuracy: {},
                positionAccuracy: {}
            };
        }
        catch (error) {
            logger_1.logger.error('Error getting phonetic stats:', error);
            throw new Error('Failed to get phonetic statistics');
        }
    }
}
exports.WordService = WordService;
//# sourceMappingURL=WordService.js.map