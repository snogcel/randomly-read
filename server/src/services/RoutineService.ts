import { Routine, IRoutine, ISubroutineStep } from '../models/Routine';
import { User } from '../models/User';
import { logger } from '../utils/logger';
import { defaultRoutineService, DefaultRoutineConfig } from './DefaultRoutineService';
import mongoose from 'mongoose';

export interface CreateRoutineData {
  name: string;
  description?: string;
  gradeLevel?: string;
  subroutine: ISubroutineStep[];
  assignedUsers?: string[];
}

export interface UpdateRoutineData {
  name?: string;
  description?: string;
  gradeLevel?: string;
  subroutine?: ISubroutineStep[];
  assignedUsers?: string[];
  isActive?: boolean;
}

export interface RoutineQueryOptions {
  createdBy?: string;
  assignedTo?: string;
  isActive?: boolean;
  gradeLevel?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export class RoutineService {
  private static instance: RoutineService;
  
  public static getInstance(): RoutineService {
    if (!RoutineService.instance) {
      RoutineService.instance = new RoutineService();
    }
    return RoutineService.instance;
  }

  /**
   * Create a new routine
   */
  async createRoutine(createdBy: string, data: CreateRoutineData): Promise<IRoutine> {
    try {
      // Validate creator exists
      const creator = await User.findById(createdBy);
      if (!creator) {
        throw new Error('Creator not found');
      }

      // Validate assigned users exist
      if (data.assignedUsers && data.assignedUsers.length > 0) {
        const users = await User.find({ _id: { $in: data.assignedUsers } });
        if (users.length !== data.assignedUsers.length) {
          throw new Error('One or more assigned users not found');
        }
      }

      // Generate unique IDs for subroutine steps
      const subroutineWithIds = data.subroutine.map(step => ({
        ...step,
        id: step.id || new mongoose.Types.ObjectId().toString()
      }));

      const routine = new Routine({
        ...data,
        subroutine: subroutineWithIds,
        createdBy,
        assignedUsers: data.assignedUsers || []
      });

      // Validate routine steps
      if (!routine.validateSteps()) {
        throw new Error('Invalid routine steps configuration');
      }

      const savedRoutine = await routine.save();
      
      // Update assigned users' routines array
      if (data.assignedUsers && data.assignedUsers.length > 0) {
        await User.updateMany(
          { _id: { $in: data.assignedUsers } },
          { $addToSet: { routines: savedRoutine._id } }
        );
      }

      logger.info(`Routine created: ${savedRoutine.name} by user ${createdBy}`);
      return savedRoutine;
      
    } catch (error) {
      logger.error('Error creating routine:', error);
      throw new Error(`Failed to create routine: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get routine by ID
   */
  async getRoutineById(id: string, userId?: string): Promise<IRoutine | null> {
    try {
      const routine = await Routine.findById(id)
        .populate('createdBy', 'username firstName lastName')
        .populate('assignedUsers', 'username firstName lastName');

      if (!routine) {
        return null;
      }

      // Check if user has access to this routine
      if (userId && !this.hasRoutineAccess(routine, userId)) {
        throw new Error('Access denied to this routine');
      }

      return routine;
      
    } catch (error) {
      logger.error('Error getting routine by ID:', error);
      throw new Error('Failed to get routine');
    }
  }

  /**
   * Update routine
   */
  async updateRoutine(id: string, userId: string, data: UpdateRoutineData): Promise<IRoutine> {
    try {
      const routine = await Routine.findById(id);
      if (!routine) {
        throw new Error('Routine not found');
      }

      // Check if user can update this routine
      if (!routine.createdBy.equals(userId)) {
        throw new Error('Access denied to update this routine');
      }

      // Validate assigned users if provided
      if (data.assignedUsers) {
        const users = await User.find({ _id: { $in: data.assignedUsers } });
        if (users.length !== data.assignedUsers.length) {
          throw new Error('One or more assigned users not found');
        }
      }

      // Generate IDs for new subroutine steps
      if (data.subroutine) {
        data.subroutine = data.subroutine.map(step => ({
          ...step,
          id: step.id || new mongoose.Types.ObjectId().toString()
        }));
      }

      // Update routine
      Object.assign(routine, data);

      // Validate updated routine steps
      if (data.subroutine && !routine.validateSteps()) {
        throw new Error('Invalid routine steps configuration');
      }

      const updatedRoutine = await routine.save();

      // Update user assignments if changed
      if (data.assignedUsers) {
        // Remove routine from previously assigned users
        await User.updateMany(
          { routines: routine._id },
          { $pull: { routines: routine._id } }
        );
        
        // Add routine to newly assigned users
        await User.updateMany(
          { _id: { $in: data.assignedUsers } },
          { $addToSet: { routines: routine._id } }
        );
      }

      logger.info(`Routine updated: ${updatedRoutine.name} by user ${userId}`);
      return updatedRoutine;
      
    } catch (error) {
      logger.error('Error updating routine:', error);
      throw new Error(`Failed to update routine: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Delete routine
   */
  async deleteRoutine(id: string, userId: string): Promise<void> {
    try {
      const routine = await Routine.findById(id);
      if (!routine) {
        throw new Error('Routine not found');
      }

      // Check if user can delete this routine
      if (!routine.createdBy.equals(userId)) {
        throw new Error('Access denied to delete this routine');
      }

      // Remove routine from all assigned users
      await User.updateMany(
        { routines: routine._id },
        { $pull: { routines: routine._id } }
      );

      // Soft delete by setting isActive to false
      routine.isActive = false;
      await routine.save();

      logger.info(`Routine deleted: ${routine.name} by user ${userId}`);
      
    } catch (error) {
      logger.error('Error deleting routine:', error);
      throw new Error(`Failed to delete routine: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Query routines with filters
   */
  async queryRoutines(options: RoutineQueryOptions): Promise<{
    routines: IRoutine[];
    totalCount: number;
    hasMore: boolean;
  }> {
    try {
      const filter: any = {};
      
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

      const totalCount = await Routine.countDocuments(filter);
      
      const routines = await Routine.find(filter)
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
      
    } catch (error) {
      logger.error('Error querying routines:', error);
      throw new Error('Failed to query routines');
    }
  }

  /**
   * Get routines for a specific user
   */
  async getUserRoutines(userId: string): Promise<IRoutine[]> {
    try {
      const user = await User.findById(userId).populate('routines');
      if (!user) {
        throw new Error('User not found');
      }

      return (user.routines as unknown as IRoutine[]) || [];
      
    } catch (error) {
      logger.error('Error getting user routines:', error);
      throw new Error('Failed to get user routines');
    }
  }

  /**
   * Assign routine to users
   */
  async assignRoutineToUsers(routineId: string, userIds: string[], assignedBy: string): Promise<void> {
    try {
      const routine = await Routine.findById(routineId);
      if (!routine) {
        throw new Error('Routine not found');
      }

      // Check if user can assign this routine
      if (!routine.createdBy.equals(assignedBy)) {
        throw new Error('Access denied to assign this routine');
      }

      // Validate users exist
      const users = await User.find({ _id: { $in: userIds } });
      if (users.length !== userIds.length) {
        throw new Error('One or more users not found');
      }

      // Add users to routine
      await Routine.findByIdAndUpdate(
        routineId,
        { $addToSet: { assignedUsers: { $each: userIds } } }
      );

      // Add routine to users
      await User.updateMany(
        { _id: { $in: userIds } },
        { $addToSet: { routines: routineId } }
      );

      logger.info(`Routine ${routineId} assigned to ${userIds.length} users by ${assignedBy}`);
      
    } catch (error) {
      logger.error('Error assigning routine to users:', error);
      throw new Error(`Failed to assign routine: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Unassign routine from users
   */
  async unassignRoutineFromUsers(routineId: string, userIds: string[], unassignedBy: string): Promise<void> {
    try {
      const routine = await Routine.findById(routineId);
      if (!routine) {
        throw new Error('Routine not found');
      }

      // Check if user can unassign this routine
      if (!routine.createdBy.equals(unassignedBy)) {
        throw new Error('Access denied to unassign this routine');
      }

      // Remove users from routine
      await Routine.findByIdAndUpdate(
        routineId,
        { $pull: { assignedUsers: { $in: userIds } } }
      );

      // Remove routine from users
      await User.updateMany(
        { _id: { $in: userIds } },
        { $pull: { routines: routineId } }
      );

      logger.info(`Routine ${routineId} unassigned from ${userIds.length} users by ${unassignedBy}`);
      
    } catch (error) {
      logger.error('Error unassigning routine from users:', error);
      throw new Error(`Failed to unassign routine: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Validate routine configuration
   */
  validateRoutineConfig(subroutine: ISubroutineStep[]): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!subroutine || subroutine.length === 0) {
      errors.push('Routine must have at least one step');
      return { isValid: false, errors };
    }

    if (subroutine.length > 50) {
      errors.push('Routine cannot have more than 50 steps');
    }

    for (let i = 0; i < subroutine.length; i++) {
      const step = subroutine[i];
      
      if (!step) {
        errors.push(`Step ${i + 1}: Step is undefined`);
        continue;
      }
      
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

  /**
   * Check if user has access to routine
   */
  private hasRoutineAccess(routine: IRoutine, userId: string): boolean {
    return (
      routine.createdBy.equals(userId) ||
      routine.assignedUsers.some(user => user.equals && user.equals(userId))
    );
  }

  /**
   * Get all default routines
   */
  getDefaultRoutines(): DefaultRoutineConfig[] {
    return defaultRoutineService.getDefaultRoutines();
  }

  /**
   * Get default routine by ID
   */
  getDefaultRoutineById(id: string): DefaultRoutineConfig | null {
    return defaultRoutineService.getDefaultRoutineById(id);
  }

  /**
   * Create user routine from default routine
   */
  async createRoutineFromDefault(userId: string, defaultRoutineId: string): Promise<IRoutine> {
    try {
      const defaultRoutine = defaultRoutineService.getDefaultRoutineById(defaultRoutineId);
      if (!defaultRoutine) {
        throw new Error('Default routine not found');
      }

      const routineData = defaultRoutineService.convertToUserRoutine(defaultRoutine, userId);
      
      // Convert to the format expected by createRoutine
      const createData: CreateRoutineData = {
        name: routineData.name,
        description: routineData.description,
        gradeLevel: routineData.difficulty,
        subroutine: routineData.steps.map(step => ({
          id: step.id,
          type: step.type as 'word' | 'sentence' | 'intermission',
          duration: step.duration,
          repetitions: step.repetitions,
          phoneticConfig: step.phoneticConfig ? {
            vowels: step.phoneticConfig.vowels,
            consonants: step.phoneticConfig.consonants,
            position: (step.phoneticConfig.positions[0] || 'initial') as 'initial' | 'medial' | 'final',
            syllables: step.phoneticConfig.syllables,
            gradeLevel: step.phoneticConfig.grades.join(',')
          } : undefined,
          intermissionText: step.intermissionText
        }))
      };

      return await this.createRoutine(userId, createData);
      
    } catch (error) {
      logger.error('Error creating routine from default:', error);
      throw new Error(`Failed to create routine from default: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get recommended routine for user
   */
  getRecommendedRoutine(userLevel?: string): DefaultRoutineConfig {
    return defaultRoutineService.getRecommendedRoutine(userLevel);
  }
}