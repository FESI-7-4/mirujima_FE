'use client';

import React from 'react';

import useGoalActions from '@/hooks/goal/useGoalActions';
import KebabMenu from '@/components/kebab/KebabMenu';

interface Props {
  goalId: number;
  goalTitle: string;
}

export default function EditGoal({ goalId, goalTitle }: Props) {
  const { handleEdit, handleDelete } = useGoalActions(goalId, goalTitle);

  return <KebabMenu size={24} onEdit={handleEdit} onDelete={handleDelete} />;
}
