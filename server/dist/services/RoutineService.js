"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineService = void 0;
const Routine_1 = require("../models/Routine");
const User_1 = require("../models/User");
const logger_1 = require("../utils/logger");
const DefaultRoutineService_1 = require("./DefaultRoutineService");
const mongoose_1 = __importDefault(require("mongoose"));
class RoutineService {
    static getInstance() {
        if (!RoutineService.instance) {
            RoutineService.instance = new RoutineService();
        }
        return RoutineService.instance;
    }
    async createRoutine(createdBy, data) {
        try {
            const creator = await User_1.User.findById(createdBy);
            if (!creator) {
                throw new Error('Creator not found');
            }
            if (data.assignedUsers && data.assignedUsers.length > 0) {
                const users = await User_1.User.find({ _id: { $in: data.assignedUsers } });
                if (users.length !== data.assignedUsers.length) {
                    throw new Error('One or more assigned users not found');
                }
            }
            const subroutineWithIds = data.subroutine.map(step => ({
                ...step,
                id: step.id || new mongoose_1.default.Types.ObjectId().toString()
            }));
            const routine = new Routine_1.Routine({
                ...data,
                subroutine: subroutineWithIds,
                createdBy,
                assignedUsers: data.assignedUsers || []
            });
            if (!routine.validateSteps()) {
                throw new Error('Invalid routine steps configuration');
            }
            const savedRoutine = await routine.save();
            if (data.assignedUsers && data.assignedUsers.length > 0) {
                await User_1.User.updateMany({ _id: { $in: data.assignedUsers } }, { $addToSet: { routines: savedRoutine._id } });
            }
            logger_1.logger.info(`Routine created: ${savedRoutine.name} by user ${createdBy}`);
            return savedRoutine;
        }
        catch (error) {
            logger_1.logger.error('Error creating routine:', error);
            throw new Error(`Failed to create routine: ${error.message}`);
        }
    }
    async getRoutineById(id, userId) {
        try {
            const routine = await Routine_1.Routine.findById(id)
                .populate('createdBy', 'username firstName lastName')
                .populate('assignedUsers', 'username firstName lastName');
            if (!routine) {
                return null;
            }
            if (userId && !this.hasRoutineAccess(routine, userId)) {
                throw new Error('Access denied to this routine');
            }
            return routine;
        }
        catch (error) {
            logger_1.logger.error('Error getting routine by ID:', error);
            throw new Error('Failed to get routine');
        }
    }
    async updateRoutine(id, userId, data) {
        try {
            const routine = await Routine_1.Routine.findById(id);
            if (!routine) {
                throw new Error('Routine not found');
            }
            if (!routine.createdBy.equals(userId)) {
                throw new Error('Access denied to update this routine');
            }
            if (data.assignedUsers) {
                const users = await User_1.User.find({ _id: { $in: data.assignedUsers } });
                if (users.length !== data.assignedUsers.length) {
                    throw new Error('One or more assigned users not found');
                }
            }
            if (data.subroutine) {
                data.subroutine = data.subroutine.map(step => ({
                    ...step,
                    id: step.id || new mongoose_1.default.Types.ObjectId().toString()
                }));
            }
            Object.assign(routine, data);
            if (data.subroutine && !routine.validateSteps()) {
                throw new Error('Invalid routine steps configuration');
            }
            const updatedRoutine = await routine.save();
            if (data.assignedUsers) {
                await User_1.User.updateMany({ routines: routine._id }, { $pull: { routines: routine._id } });
                await User_1.User.updateMany({ _id: { $in: data.assignedUsers } }, { $addToSet: { routines: routine._id } });
            }
            logger_1.logger.info(`Routine updated: ${updatedRoutine.name} by user ${userId}`);
            return updatedRoutine;
        }
        catch (error) {
            logger_1.logger.error('Error updating routine:', error);
            throw new Error(`Failed to update routine: ${error.message}`);
        }
    }
    async deleteRoutine(id, userId) {
        try {
            const routine = await Routine_1.Routine.findById(id);
            if (!routine) {
                throw new Error('Routine not found');
            }
            if (!routine.createdBy.equals(userId)) {
                throw new Error('Access denied to delete this routine');
            }
            await User_1.User.updateMany({ routines: routine._id }, { $pull: { routines: routine._id } });
            routine.isActive = false;
            await routine.save();
            logger_1.logger.info(`Routine deleted: ${routine.name} by user ${userId}`);
        }
        catch (error) {
            logger_1.logger.error('Error deleting routine:', error);
            throw new Error(`Failed to delete routine: ${error.message}`);
        }
    }
    async queryRoutines(options) {
        try {
            const filter = {};
            if (options.createdBy) {
                filter.createdBy = options.createdBy;
            }
            if (options.assignedTo) {
                filter.assignedUsers = options.assignedTo;
            }
            if (typeof options.isActive === 'boolean') {
                filter.isActive = options.isActive;
            }
            if (options.gradeLevel) {
                filter.gradeLevel = options.gradeLevel;
            }
            const limit = options.limit || 20;
            const offset = options.offset || 0;
            const sortBy = options.sortBy || 'createdAt';
            const sortOrder = options.sortOrder === 'asc' ? 1 : -1;
            const totalCount = await Routine_1.Routine.countDocuments(filter);
            const routines = await Routine_1.Routine.find(filter)
                .populate('createdBy', 'username firstName lastName')
                .populate('assignedUsers', 'username firstName lastName')
                .sort({ [sortBy]: sortOrder })
                .skip(offset)
                .limit(limit);
            return {
                routines,
                totalCount,
                hasMore: totalCount > offset + limit
            };
        }
        catch (error) {
            logger_1.logger.error('Error querying routines:', error);
            throw new Error('Failed to query routines');
        }
    }
    async getUserRoutines(userId) {
        try {
            const user = await User_1.User.findById(userId).populate('routines');
            if (!user) {
                throw new Error('User not found');
            }
            return user.routines || [];
        }
        catch (error) {
            logger_1.logger.error('Error getting user routines:', error);
            throw new Error('Failed to get user routines');
        }
    }
    async assignRoutineToUsers(routineId, userIds, assignedBy) {
        try {
            const routine = await Routine_1.Routine.findById(routineId);
            if (!routine) {
                throw new Error('Routine not found');
            }
            if (!routine.createdBy.equals(assignedBy)) {
                throw new Error('Access denied to assign this routine');
            }
            const users = await User_1.User.find({ _id: { $in: userIds } });
            if (users.length !== userIds.length) {
                throw new Error('One or more users not found');
            }
            await Routine_1.Routine.findByIdAndUpdate(routineId, { $addToSet: { assignedUsers: { $each: userIds } } });
            await User_1.User.updateMany({ _id: { $in: userIds } }, { $addToSet: { routines: routineId } });
            logger_1.logger.info(`Routine ${routineId} assigned to ${userIds.length} users by ${assignedBy}`);
        }
        catch (error) {
            logger_1.logger.error('Error assigning routine to users:', error);
            throw new Error(`Failed to assign routine: ${error.message}`);
        }
    }
    async unassignRoutineFromUsers(routineId, userIds, unassignedBy) {
        try {
            const routine = await Routine_1.Routine.findById(routineId);
            if (!routine) {
                throw new Error('Routine not found');
            }
            if (!routine.createdBy.equals(unassignedBy)) {
                throw new Error('Access denied to unassign this routine');
            }
            await Routine_1.Routine.findByIdAndUpdate(routineId, { $pull: { assignedUsers: { $in: userIds } } });
            await User_1.User.updateMany({ _id: { $in: userIds } }, { $pull: { routines: routineId } });
            logger_1.logger.info(`Routine ${routineId} unassigned from ${userIds.length} users by ${unassignedBy}`);
        }
        catch (error) {
            logger_1.logger.error('Error unassigning routine from users:', error);
            throw new Error(`Failed to unassign routine: ${error.message}`);
        }
    }
    validateRoutineConfig(subroutine) {
        const errors = [];
        if (!subroutine || subroutine.length === 0) {
            errors.push('Routine must have at least one step');
            return { isValid: false, errors };
        }
        if (subroutine.length > 50) {
            errors.push('Routine cannot have more than 50 steps');
        }
        for (let i = 0; i < subroutine.length; i++) {
            const step = subroutine[i];
            if (!step.id) {
                errors.push(`Step ${i + 1}: Missing step ID`);
            }
            if (!['word', 'sentence', 'intermission'].includes(step.type)) {
                errors.push(`Step ${i + 1}: Invalid step type`);
            }
            if (step.duration < 1 || step.duration > 3600) {
                errors.push(`Step ${i + 1}: Duration must be between 1 and 3600 seconds`);
            }
            if (step.repetitions < 1 || step.repetitions > 1000) {
                errors.push(`Step ${i + 1}: Repetitions must be between 1 and 1000`);
            }
            if ((step.type === 'word' || step.type === 'sentence') && !step.phoneticConfig) {
                errors.push(`Step ${i + 1}: Phonetic configuration required for ${step.type} steps`);
            }
            if (step.type === 'intermission' && !step.intermissionText) {
                errors.push(`Step ${i + 1}: Intermission text required for intermission steps`);
            }
        }
        return { isValid: errors.length === 0, errors };
    }
    hasRoutineAccess(routine, userId) {
        return (routine.createdBy.equals(userId) ||
            routine.assignedUsers.some(user => user.equals && user.equals(userId)));
    }
    getDefaultRoutines() {
        return DefaultRoutineService_1.defaultRoutineService.getDefaultRoutines();
    }
    getDefaultRoutineById(id) {
        return DefaultRoutineService_1.defaultRoutineService.getDefaultRoutineById(id);
    }
    async createRoutineFromDefault(userId, defaultRoutineId) {
        try {
            const defaultRoutine = DefaultRoutineService_1.defaultRoutineService.getDefaultRoutineById(defaultRoutineId);
            if (!defaultRoutine) {
                throw new Error('Default routine not found');
            }
            const routineData = DefaultRoutineService_1.defaultRoutineService.convertToUserRoutine(defaultRoutine, userId);
            const createData = {
                name: routineData.name,
                description: routineData.description,
                gradeLevel: routineData.difficulty,
                subroutine: routineData.steps.map(step => ({
                    id: step.id,
                    type: step.type,
                    duration: step.duration,
                    repetitions: step.repetitions,
                    phoneticConfig: step.phoneticConfig ? {
                        vowels: step.phoneticConfig.vowels,
                        consonants: step.phoneticConfig.consonants,
                        position: step.phoneticConfig.positions[0] || 'initial',
                        syllables: step.phoneticConfig.syllables,
                        gradeLevel: step.phoneticConfig.grades.join(',')
                    } : undefined,
                    intermissionText: step.intermissionText
                }))
            };
            return await this.createRoutine(userId, createData);
        }
        catch (error) {
            logger_1.logger.error('Error creating routine from default:', error);
            throw new Error(`Failed to create routine from default: ${error.message}`);
        }
    }
    getRecommendedRoutine(userLevel) {
        return DefaultRoutineService_1.defaultRoutineService.getRecommendedRoutine(userLevel);
    }
}
exports.RoutineService = RoutineService;
//# sourceMappingURL=RoutineService.js.map