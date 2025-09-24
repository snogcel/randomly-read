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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../config");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstName: {
        type: String,
        required: false,
        trim: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: false,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    routines: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Routine'
        }],
    interactionSettings: [{
            type: mongoose_1.Schema.Types.Mixed
        }],
    age: {
        type: Number,
        required: false,
        min: 1,
        max: 120
    },
    gender: {
        type: String,
        required: false,
        enum: ['male', 'female', 'other', 'prefer-not-to-say']
    },
    address: {
        type: String,
        required: false,
        maxlength: 200
    },
    city: {
        type: String,
        required: false,
        maxlength: 100
    },
    stateProvince: {
        type: String,
        required: false,
        maxlength: 100
    },
    postalCode: {
        type: String,
        required: false,
        maxlength: 20
    },
    country: {
        type: String,
        required: false,
        maxlength: 100
    },
    company: {
        type: String,
        required: false,
        maxlength: 100
    },
    clients: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }],
    isActive: {
        type: Boolean,
        required: false,
        default: true
    }
}, {
    timestamps: true,
    collation: { locale: 'en', strength: 1 }
});
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });
userSchema.set('toJSON', {
    getters: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
    }
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    try {
        this.password = await bcryptjs_1.default.hash(this.password, config_1.config.security.bcryptRounds);
        next();
    }
    catch (error) {
        next(error);
    }
});
userSchema.methods.isValidPassword = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password);
};
userSchema.methods.getPublicProfile = function () {
    const { password, ...publicProfile } = this.toObject();
    return publicProfile;
};
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map