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

import React, { useState, useEffect } from 'react';
import { Form5SelectLevelForm, Form5SelectLevelList } from '../components';
import { form5SelectLevelService } from '../services';
import { Form5SelectLevel } from '../types/Form5SelectLevelTypes';

const Form5SelectLevelPage: React.FC = () => {
  const [levels, setLevels] = useState<Form5SelectLevel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Form5SelectLevel | null>(null);

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      setLoading(true);
      const data = await form5SelectLevelService.getAll();
      setLevels(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch levels');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (level: Form5SelectLevel) => {
    try {
      setLoading(true);
      await form5SelectLevelService.create(level);
      await fetchLevels();
      setError(null);
    } catch (err) {
      setError('Failed to create level');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (level: Form5SelectLevel) => {
    try {
      setLoading(true);
      await form5SelectLevelService.update(level);
      await fetchLevels();
      setSelectedLevel(null);
      setError(null);
    } catch (err) {
      setError('Failed to update level');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await form5SelectLevelService.delete(id);
      await fetchLevels();
      setError(null);
    } catch (err) {
      setError('Failed to delete level');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (level: Form5SelectLevel) => {
    setSelectedLevel(level);
  };

  return (
    <div>
      <h1>Form5 Select Level</h1>
      {error && <div className="error">{error}</div>}
      <Form5SelectLevelForm
        onSubmit={selectedLevel ? handleUpdate : handleCreate}
        initialData={selectedLevel}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Form5SelectLevelList
          levels={levels}
          onDelete={handleDelete}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default Form5SelectLevelPage;