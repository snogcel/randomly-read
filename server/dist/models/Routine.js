"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routine = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const phoneticConfigurationSchema = new mongoose_1.Schema({
    vowels: [{
            type: String,
            required: true,
            enum: ['AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY', 'IH', 'IY', 'OW', 'OY', 'UH', 'UW']
        }],
    consonants: [{
            type: String,
            required: true,
            enum: ['B', 'CH', 'D', 'DH', 'F', 'G', 'HH', 'JH', 'K', 'L', 'M', 'N', 'NG', 'P', 'R', 'S', 'SH', 'T', 'TH', 'V', 'W', 'Y', 'Z', 'ZH']
        }],
    position: {
        type: String,
        required: true,
        enum: ['initial', 'medial', 'final']
    },
    syllables: [{
            type: Number,
            required: true,
            min: 1,
            max: 10
        }],
    gradeLevel: {
        type: String,
        required: true,
        enum: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'adult']
    }
}, { _id: false });
const subroutineStepSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['word', 'sentence', 'intermission']
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
        max: 3600
    },
    repetitions: {
        type: Number,
        required: true,
        min: 1,
        max: 1000
    },
    phoneticConfig: {
        type: phoneticConfigurationSchema,
        required: function () {
            return this.type === 'word' || this.type === 'sentence';
        }
    },
    intermissionText: {
        type: String,
        required: function () {
            return this.type === 'intermission';
        },
        maxlength: 500
    }
}, { _id: false });
const routineSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxlength: 500
    },
    gradeLevel: {
        type: String,
        required: false,
        enum: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'adult']
    },
    subroutine: {
        type: [subroutineStepSchema],
        required: true,
        validate: {
            validator: function (steps) {
                return steps.length > 0 && steps.length <= 50;
            },
            message: 'Routine must have between 1 and 50 steps'
        }
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedUsers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collation: { locale: 'en', strength: 1 }
});
routineSchema.index({ createdBy: 1 });
routineSchema.index({ assignedUsers: 1 });
routineSchema.index({ isActive: 1 });
routineSchema.index({ name: 'text', description: 'text' });
routineSchema.set('toJSON', {
    getters: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
routineSchema.methods.validateSteps = function () {
    return this.subroutine.every((step) => {
        if (step.type === 'intermission') {
            return !!step.intermissionText;
        }
        return !!step.phoneticConfig;
    });
};
routineSchema.methods.getTotalDuration = function () {
    return this.subroutine.reduce((total, step) => {
        return total + (step.duration * step.repetitions);
    }, 0);
};
routineSchema.methods.getStepCount = function () {
    return this.subroutine.length;
};
exports.Routine = mongoose_1.default.model('Routine', routineSchema);
//# sourceMappingURL=Routine.js.map