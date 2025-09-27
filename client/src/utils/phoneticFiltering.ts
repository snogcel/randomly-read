// Utility functions for phonetic filtering and blacklist management

import getBlacklist from '../util/blacklists';
import { VowelSound, ConsonantSound } from '../types/routineBuilder';

export interface PhoneticFilterOptions {
  vowels: string[];
  consonants: string[];
  syllables: number[];
  position: string;
  gradeLevel: string;
  mode: string;
}

/**
 * Filters available consonants based on selected vowels, syllables, position, and grade level
 * using the blacklist system to remove invalid combinations.
 */
export const filterAvailableConsonants = (
  availableConsonants: ConsonantSound[],
  options: PhoneticFilterOptions
): string[] => {
  const { vowels, consonants, syllables, position, gradeLevel, mode } = options;

  // Return empty array if intermission mode
  if (mode === "Intermission" || typeof mode === "undefined") {
    return [];
  }

  // If no vowels selected, no filtering needed
  if (vowels.length === 0) {
    return [];
  }

  let blacklistedConsonants: string[] = [];
  
  try {
    // Get blacklist for the current configuration
    const blacklist = getBlacklist(gradeLevel, mode, position);
    
    // Use all syllables if none specified
    const syllablesToCheck = syllables.length === 0 ? [1, 2, 3, 4, 5] : syllables;
    
    // Iterate through vowel array (in cases where more than one vowel is being filtered on)
    for (let i = 0; i < vowels.length; i++) {
      const vowelId = vowels[i];
      
      // Check if vowel exists in blacklist
      if (!blacklist[vowelId] || !blacklist[vowelId].consonants) {
        continue;
      }
      
      // Determine overlap across syllables
      for (let j = 0; j < syllablesToCheck.length; j++) {
        const syllableIndex = syllablesToCheck[j] - 1; // Convert to 0-based index
        
        if (syllableIndex < 0 || syllableIndex >= blacklist[vowelId].consonants.length) {
          continue;
        }
        
        const syllableBlacklist = blacklist[vowelId].consonants[syllableIndex];
        
        if (j === 0 && i === 0) {
          // For first iteration, include full array
          blacklistedConsonants = [...syllableBlacklist];
        } else {
          // Find intersection of arrays (consonants that are blacklisted across all combinations)
          blacklistedConsonants = blacklistedConsonants.filter(consonant =>
            syllableBlacklist.indexOf(consonant) > -1
          );
        }
      }
    }
  } catch (error) {
    console.warn('Error filtering consonants with blacklist:', error);
    return [];
  }

  return blacklistedConsonants;
};

/**
 * Removes blacklisted consonants from the current selection
 */
export const removeBlacklistedConsonants = (
  currentConsonants: string[],
  blacklistedConsonants: string[],
  removeConsonantCallback: (consonant: string) => void
): void => {
  currentConsonants.forEach(consonant => {
    if (blacklistedConsonants.indexOf(consonant) > -1) {
      removeConsonantCallback(consonant);
    }
  });
};

/**
 * Gets available consonant options filtered by blacklist
 */
export const getFilteredConsonantOptions = (
  availableConsonants: ConsonantSound[],
  options: PhoneticFilterOptions
): ConsonantSound[] => {
  const blacklistedConsonants = filterAvailableConsonants(availableConsonants, options);
  
  return availableConsonants.filter(consonant => 
    blacklistedConsonants.indexOf(consonant.id) === -1
  );
};

/**
 * Validates if a phonetic configuration is valid (has available words)
 */
export const validatePhoneticConfiguration = (
  options: PhoneticFilterOptions
): { isValid: boolean; message?: string } => {
  const { vowels, consonants, syllables, position, mode } = options;

  // Intermission mode is always valid
  if (mode === "Intermission") {
    return { isValid: true };
  }

  // Must have at least one vowel or consonant for word mode
  if (mode === "Word" && vowels.length === 0 && consonants.length === 0) {
    return { 
      isValid: false, 
      message: "Please select at least one vowel or consonant for word exercises." 
    };
  }

  // Check for valid syllable range
  if (syllables.some(s => s < 1 || s > 5)) {
    return { 
      isValid: false, 
      message: "Syllable count must be between 1 and 5." 
    };
  }

  // Check for valid position
  const validPositions = ['initial', 'medial', 'final'];
  if (consonants.length > 0 && !validPositions.includes(position)) {
    return { 
      isValid: false, 
      message: "Please select a valid consonant position." 
    };
  }

  return { isValid: true };
};

/**
 * Gets a human-readable description of the current phonetic configuration
 */
export const getPhoneticConfigurationDescription = (
  options: PhoneticFilterOptions,
  availableVowels: VowelSound[],
  availableConsonants: ConsonantSound[]
): string => {
  const { vowels, consonants, syllables, position, mode } = options;

  if (mode === "Intermission") {
    return "Intermission step - no phonetic filtering applied.";
  }

  let description = `${mode} exercise`;

  // Add vowel information
  if (vowels.length > 0) {
    const vowelNames = vowels.map(id => {
      const vowel = availableVowels.find(v => v.id === id);
      return vowel ? vowel.name : id;
    });
    description += ` focused on ${vowelNames.join(', ')} vowel sounds`;
  }

  // Add consonant information
  if (consonants.length > 0) {
    const consonantNames = consonants.map(id => {
      const consonant = availableConsonants.find(c => c.id === id);
      return consonant ? consonant.name : id;
    });
    
    const positionText = position === 'initial' ? 'starting with' : 
                        position === 'medial' ? 'containing' : 'ending with';
    
    description += ` ${positionText} ${consonantNames.join(', ')} consonant sounds`;
  }

  // Add syllable information
  if (syllables.length > 0 && syllables.length < 5) {
    const syllableText = syllables.length === 1 ? 
      `${syllables[0]} syllable` : 
      `${syllables.join(', ')} syllables`;
    description += ` with ${syllableText}`;
  }

  return description;
};