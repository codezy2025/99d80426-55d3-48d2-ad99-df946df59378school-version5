/**
 * 🏗️  DEVELOPMENT GUIDE - Form5 (Select Level) Form Component
 * 
 * 📋 Original Requirements: Create a React TSX component for a level selection form that:
1. Fetches and displays academic levels from an API
2. Shows levels in a selectable list (similar to ListView)
3. Allows selecting a level and passing data back to parent component
4. Handles empty state (changes button to Cancel)
5. Matches the workflow described in the documentation
 * 
 * 🚀 Enhancement Ideas:
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Form5 (Select Level)> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React from 'react';
import { useQuery } from 'react-query';
import { Level } from '../types/Form5 (Select Level)Types';

interface Form5SelectLevelProps {
  onSelect: (level: Level) => void;
  onCancel: () => void;
}

const fetchLevels = async (): Promise<Level[]> => {
  const response = await fetch('/api/levels');
  if (!response.ok) {
    throw new Error('Failed to fetch levels');
  }
  return response.json();
};

const Form5SelectLevel: React.FC<Form5SelectLevelProps> = ({ onSelect, onCancel }) => {
  const { data: levels, isLoading, error } = useQuery<Level[]>('levels', fetchLevels);

  const handleSelect = (level: Level) => {
    onSelect(level);
  };

  if (isLoading) {
    return <div>Loading levels...</div>;
  }

  if (error) {
    return <div>Error loading levels: {(error as Error).message}</div>;
  }

  return (
    <div className="level-selection-form">
      <h2>Select Academic Level</h2>
      
      {levels && levels.length > 0 ? (
        <ul className="level-list">
          {levels.map((level) => (
            <li key={level.id} className="level-item">
              <button onClick={() => handleSelect(level)}>
                {level.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <p>No levels available</p>
          <button onClick={onCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Form5SelectLevel;