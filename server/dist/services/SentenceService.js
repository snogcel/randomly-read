"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceService = void 0;
const WordService_1 = require("./WordService");
const logger_1 = require("../utils/logger");
class SentenceService {
    static getInstance() {
        if (!SentenceService.instance) {
            SentenceService.instance = new SentenceService();
        }
        return SentenceService.instance;
    }
    constructor() {
        this.defaultTemplates = [
            "{{ adjective }} hues on the {{ noun }}",
            "{{ adjective }} echoes fill the {{ noun }}",
            "{{ noun }} adorned with {{ an_adjective }} elegance",
            "{{ adjective }} colors in {{ noun }}",
            "{{ noun }} embraces {{ an_adjective }} essence",
            "{{ adjective }} mystique of the {{ noun }}",
            "{{ adjective }} enchantment in {{ noun }}",
            "{{ noun }} resonates with {{ adjective }} echoes",
            "{{ adjective }} essence graces the aura of {{ noun }}",
            "{{ noun }} through {{ an_adjective }} eyes",
            "{{ adjective }} melodies play in {{ noun }}",
            "{{ adjective }} wonders unfold in {{ noun }}",
            "{{ adjective }} {{ adjective }} illuminate the {{ noun }}",
            "{{ adjective }} tapestry of {{ noun }}",
            "{{ adjective }} stories unfold about {{ noun }}",
            "{{ noun }} touched by essence of {{ adjective }}",
            "{{ adjective }} unveils {{ adjective }} secret of {{ noun }}",
            "{{ adjective }} shades paint canvas of {{ noun }}",
            "{{ adjective }} dreams echo softly in {{ noun }}"
        ];
        this.specializedTemplates = {
            animal: [
                "{{ adjective }} {{ noun_animal }} is {{ adjective }} and wild",
                "{{ adjective }} {{ noun_animal }} roams the {{ noun_location }}",
                "{{ adjective }} {{ noun_animal }} in its natural habitat",
                "{{ adjective }} hues on the {{ noun_animal }}",
                "{{ adjective }} mystique of the {{ noun_animal }}",
                "{{ noun_animal }} touched by essence of {{ adjective }}"
            ],
            artifact: [
                "{{ adjective }} {{ noun_artifact }} exudes {{ an_adjective }} mystery",
                "{{ noun_artifact }} with {{ an_adjective }} craftsmanship",
                "{{ noun_artifact }} adorned with {{ an_adjective }} tales",
                "{{ noun_artifact }} resonates with {{ adjective }} echoes",
                "{{ adjective }} stories unfold about {{ noun_artifact }}",
                "{{ adjective }} unveils {{ adjective }} secret of {{ noun_artifact }}"
            ],
            location: [
                "{{ adjective }} {{ noun_location }} is {{ an_adjective }} haven",
                "{{ noun_location }} with {{ an_adjective }} charm",
                "{{ adjective }} essence graces the aura of {{ noun_location }}",
                "{{ adjective }} shades paint canvas of {{ noun_location }}",
                "{{ adjective }} {{ adjective }} illuminate the {{ noun_location }}"
            ],
            food: [
                "{{ noun_food }} with {{ an_adjective }} spices",
                "{{ adjective }} tapestry of {{ noun_food }}",
                "{{ adjective }} essence graces the aura of {{ noun_food }}",
                "{{ noun_food }} embraces {{ an_adjective }} essence"
            ],
            person: [
                "{{ adjective }} {{ noun_person }} is {{ adjective }}",
                "{{ adjective }} {{ noun_person }} with {{ an_adjective }} charm",
                "{{ noun_person }} touched by essence of {{ adjective }}",
                "{{ noun_person }} resonates with {{ adjective }} echoes"
            ]
        };
        this.wordService = WordService_1.WordService.getInstance();
    }
    async generateSentence(options, userId) {
        try {
            const wordData = await this.wordService.getWordsForSentence({
                ...options,
                limit: options.limit || 100
            });
            if (wordData.nouns.length === 0 || wordData.adjectives.length === 0) {
                throw new Error('Insufficient words found for sentence generation');
            }
            const templates = this.getAvailableTemplates(options.templates, wordData.filteredNouns);
            if (templates.length === 0) {
                throw new Error('No suitable templates available');
            }
            const template = templates[Math.floor(Math.random() * templates.length)];
            const sentence = await this.buildSentence(template, wordData, userId);
            logger_1.logger.info(`Sentence generated for user ${userId}: ${sentence.words.map(w => w.lexeme).join(' ')}`);
            return sentence;
        }
        catch (error) {
            logger_1.logger.error('Error generating sentence:', error);
            throw new Error(`Failed to generate sentence: ${error.message}`);
        }
    }
    getAvailableTemplates(customTemplates, filteredNouns) {
        let templates = [...this.defaultTemplates];
        if (customTemplates && customTemplates.length > 0) {
            templates = customTemplates;
        }
        if (filteredNouns) {
            Object.keys(this.specializedTemplates).forEach(subtype => {
                if (filteredNouns[subtype] && filteredNouns[subtype].length > 0) {
                    templates = templates.concat(this.specializedTemplates[subtype]);
                }
            });
        }
        return templates;
    }
    async buildSentence(template, wordData, userId) {
        const words = [];
        const tokens = this.tokenizeTemplate(template);
        for (const token of tokens) {
            if (this.isPlaceholder(token)) {
                const word = this.selectWordForPlaceholder(token, wordData);
                if (word) {
                    const wordEntry = {
                        id: word._id?.toString(),
                        lexeme: word.lexeme,
                        votes: word.votes || [],
                        score: word.score || 0
                    };
                    words.push(wordEntry);
                }
                else {
                    words.push({ lexeme: token });
                }
            }
            else {
                words.push({ lexeme: token });
            }
        }
        return { words };
    }
    tokenizeTemplate(template) {
        return template.split(/\s+/).filter(token => token.length > 0);
    }
    isPlaceholder(token) {
        return token.startsWith('{{') && token.endsWith('}}');
    }
    selectWordForPlaceholder(placeholder, wordData) {
        const cleanPlaceholder = placeholder.replace(/[{}]/g, '').trim();
        switch (cleanPlaceholder) {
            case 'noun':
                return this.selectRandomWord(wordData.nouns);
            case 'adjective':
            case 'an_adjective':
                return this.selectRandomWord(wordData.adjectives);
            case 'noun_animal':
                return this.selectRandomWord(wordData.filteredNouns.animal);
            case 'noun_location':
                return this.selectRandomWord(wordData.filteredNouns.location);
            case 'noun_person':
                return this.selectRandomWord(wordData.filteredNouns.person);
            case 'noun_food':
                return this.selectRandomWord(wordData.filteredNouns.food);
            case 'noun_artifact':
                return this.selectRandomWord(wordData.filteredNouns.artifact);
            default:
                return null;
        }
    }
    selectRandomWord(words) {
        if (!words || words.length === 0)
            return null;
        return words[Math.floor(Math.random() * words.length)];
    }
    async generateMultipleSentences(options, userId, count = 1) {
        const sentences = [];
        for (let i = 0; i < count; i++) {
            try {
                const sentence = await this.generateSentence(options, userId);
                sentences.push(sentence);
            }
            catch (error) {
                logger_1.logger.error(`Error generating sentence ${i + 1}:`, error);
            }
        }
        return sentences;
    }
    validateTemplate(template) {
        const errors = [];
        if (!template || template.trim().length === 0) {
            errors.push('Template cannot be empty');
            return { isValid: false, errors };
        }
        const openBraces = (template.match(/{{/g) || []).length;
        const closeBraces = (template.match(/}}/g) || []).length;
        if (openBraces !== closeBraces) {
            errors.push('Unbalanced placeholder braces');
        }
        const placeholders = template.match(/{{[^}]+}}/g) || [];
        const validPlaceholders = [
            'noun', 'adjective', 'an_adjective',
            'noun_animal', 'noun_location', 'noun_person', 'noun_food', 'noun_artifact'
        ];
        placeholders.forEach(placeholder => {
            const clean = placeholder.replace(/[{}]/g, '').trim();
            if (!validPlaceholders.includes(clean)) {
                errors.push(`Invalid placeholder: ${placeholder}`);
            }
        });
        const wordCount = template.split(/\s+/).length;
        if (wordCount > 20) {
            errors.push('Template too long (max 20 words)');
        }
        return { isValid: errors.length === 0, errors };
    }
}
exports.SentenceService = SentenceService;
//# sourceMappingURL=SentenceService.js.map