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

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form5Data } from '../types/Form5 (Select Level)Types';

interface Form5Props {
  onSubmit: (data: Form5Data) => void;
}

interface AcademicLevel {
  id: string;
  name: string;
}

const Form5: React.FC<Form5Props> = ({ onSubmit }) => {
  const { register, handleSubmit, watch } = useForm<Form5Data>();
  const [levels, setLevels] = useState<AcademicLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedLevel = watch('level');

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/levels');
        const data = await response.json();
        setLevels(data);
      } catch (err) {
        setError('Failed to load academic levels');
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  const handleFormSubmit = (data: Form5Data) => {
    onSubmit(data);
  };

  if (loading) {
    return <div>Loading levels...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <h2>Select Academic Level</h2>
        {levels.length > 0 ? (
          <div>
            <select {...register('level', { required: true })}>
              <option value="">Select a level</option>
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>No academic levels available</div>
        )}
      </div>
      <button type="submit" disabled={!selectedLevel}>
        {selectedLevel ? 'Continue' : 'Cancel'}
      </button>
    </form>
  );
};

export default Form5;