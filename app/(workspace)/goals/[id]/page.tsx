'use client';
import React, { useCallback, useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import KebabForGoal from '@/components/kebab/KebabForGoal';
import TaskList from '@/components/TaskList/TaskList';
import { useUpdateGoalTitle } from '@/hooks/goalsDetail/useChangeGoalTitle';
import { useDeleteGoal } from '@/hooks/goalsDetail/useDeleteGoal';
import { useGetGoalDetail } from '@/hooks/goalsDetail/useGetGoalDetail';
import { useGetTodoList } from '@/hooks/goalsDetail/useGetTodoList';
import { useInfoStore, useModalStore } from '@/provider/store-provider';
import PlusIcon from '@/public/icon/plus-border-none.svg';
import SpinIcon from '@/public/icon/spin.svg';
import GoalIcon from '@/public/icon/todo-list-black.svg';

import Button from '../_components/Button';

export default function GoalDetailPage() {
  const router = useRouter();
  const restoreUser = useInfoStore((state) => state.restoreUser);
  const params = useParams();
  const goalIdParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const goalId = goalIdParam ? parseInt(goalIdParam, 10) : null;
  const goalIdString = goalId ? goalId.toString() : '';

  // Fetch goal detail and todo lists
  const { data: goalData, isLoading, isError } = useGetGoalDetail(goalIdString);
  const { data: todosTodo } = useGetTodoList(goalId, false);
  const { data: todosDone } = useGetTodoList(goalId, true);

  const goalTitle = goalData?.result?.title ?? '목표 제목이 없어요';
  const { mutate: updateGoalTitle } = useUpdateGoalTitle();
  const { mutate: deleteGoalMutate } = useDeleteGoal();

  // Local states
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(goalTitle);
  const [activeTab, setActiveTab] = useState<'todo' | 'done'>('todo');
  const [isMounted, setIsMounted] = useState(false);

  // Modal store actions
  const setGoalDeleteModalOpen = useModalStore((state) => state.setGoalDeleteModalOpen);
  const setGoalEditModalOpen = useModalStore((state) => state.setGoalEditModalOpen);
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);

  // Restore user on mount and set isMounted flag
  useEffect(() => {
    restoreUser();
    setIsMounted(true);
  }, [restoreUser]);

  // Sync edited title with goalTitle when not editing
  useEffect(() => {
    if (!isEditing) {
      setEditedTitle(goalTitle);
    }
  }, [goalTitle, isEditing]);

  // Edit modal handlers
  const handleEditConfirm = useCallback(
    (newTitle: string) => {
      if (!goalId) return;
      const trimmedTitle = newTitle.trim();
      if (trimmedTitle === '') {
        setEditedTitle(goalTitle);
        return;
      }
      updateGoalTitle(
        { goalId, title: trimmedTitle },
        {
          onSuccess: () => {
            setGoalEditModalOpen(false);
            setEditedTitle(trimmedTitle);
          },
          onError: () => setEditedTitle(goalTitle)
        }
      );
    },
    [goalId, goalTitle, updateGoalTitle, setGoalEditModalOpen]
  );

  const handleEditCancel = useCallback(() => {
    setGoalEditModalOpen(false);
    setEditedTitle(goalTitle);
  }, [goalTitle, setGoalEditModalOpen]);

  const handleEdit = useCallback(() => {
    setGoalEditModalOpen(true, {
      onConfirm: handleEditConfirm,
      onCancel: handleEditCancel,
      initialValue: goalTitle
    });
  }, [goalTitle, handleEditConfirm, handleEditCancel, setGoalEditModalOpen]);

  // Delete modal handlers
  const handleDeleteConfirm = useCallback(() => {
    if (!goalId) return;
    deleteGoalMutate(goalId, {
      onSuccess: () => {
        setGoalDeleteModalOpen(false);
        router.push('/dashboard');
      }
    });
  }, [goalId, deleteGoalMutate, router, setGoalDeleteModalOpen]);

  const handleDeleteCancel = useCallback(() => {
    setGoalDeleteModalOpen(false);
  }, [setGoalDeleteModalOpen]);

  const handleDelete = useCallback(() => {
    setGoalDeleteModalOpen(true, {
      onConfirm: handleDeleteConfirm,
      onCancel: handleDeleteCancel
    });
  }, [handleDeleteConfirm, handleDeleteCancel, setGoalDeleteModalOpen]);

  // Tab and Todo 추가 핸들러
  const handleTabChange = useCallback((tab: 'todo' | 'done') => {
    setActiveTab(tab);
  }, []);

  const handleAddTodo = useCallback(() => {
    setIsTodoCreateModalOpen(true);
  }, [setIsTodoCreateModalOpen]);

  // Loading and error states
  if (!goalId) return <div>유효하지 않은 목표입니다.</div>;
  if (isLoading)
    return (
      <div>
        <SpinIcon />
      </div>
    );
  if (isError || !goalData) return <div>목표 정보를 불러오는데 실패했습니다.</div>;

  return (
    <section className="flex min-h-[262px] w-full max-w-[1284px] flex-col gap-6 md:pt-4">
      <h2 className="flex w-full items-center gap-2">
        <GoalIcon className="flex-shrink-0" />
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              autoFocus
              className="w-full truncate border-b border-gray200 text-lg font-bold outline-none"
            />
          ) : (
            <span className="block w-full truncate text-lg font-bold">{editedTitle}</span>
          )}
        </div>
        <KebabForGoal
          className="flex-shrink-0"
          size={24}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </h2>

      <Button onClick={() => router.push(`/noteList/${goalId}`)}>노트 모아보기</Button>

      <div className="flex flex-col rounded-2xl border border-gray200 bg-white shadow-sm desktop:flex-row desktop:rounded-2xl desktop:p-6">
        <div className="flex rounded-t-lg desktop:hidden">
          <div className="flex h-[52px] w-full items-center rounded-lg border-b border-gray200 border-transparent px-4">
            <button
              className={`relative min-w-[71px] py-4 text-center text-body1 ${
                activeTab === 'todo' ? 'font-medium text-black' : 'text-Gray500'
              }`}
              onClick={() => handleTabChange('todo')}
            >
              To do
              {activeTab === 'todo' && (
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-main"></div>
              )}
            </button>
            <button
              className={`relative min-w-[80px] py-4 text-center text-body1 ${
                activeTab === 'done' ? 'font-medium text-black' : 'text-Gray500'
              }`}
              onClick={() => handleTabChange('done')}
            >
              Done
              {activeTab === 'done' && (
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-main"></div>
              )}
            </button>

            <div className="flex-grow"></div>

            {activeTab === 'todo' && (
              <button onClick={handleAddTodo} className="flex items-center text-main">
                <PlusIcon /> 할일 추가
              </button>
            )}
          </div>
        </div>

        <div
          className={`flex-1 overflow-y-auto p-4 desktop:p-0 ${
            activeTab === 'todo' ? 'block' : 'hidden desktop:block'
          }`}
        >
          {isMounted && window.innerWidth >= 1280 && (
            <h2 className="z-5 sticky top-0 bg-white py-2 text-[15px] font-medium leading-[20px] text-gray500">
              To do
            </h2>
          )}
          <TaskList goalId={goalId} done={false} />
        </div>

        <div className="mx-6 my-4 hidden translate-y-5 items-center justify-center desktop:flex">
          <span className="min-h-[160px] w-px border-l border-dashed border-gray200"></span>
        </div>

        <div
          className={`flex-1 overflow-y-auto p-4 desktop:p-0 ${
            activeTab === 'done' ? 'block' : 'hidden desktop:block'
          }`}
        >
          {isMounted && window.innerWidth >= 1280 && (
            <h2 className="z-5 sticky top-0 bg-white py-2 text-[15px] font-medium leading-[20px] text-gray500">
              Done
            </h2>
          )}
          <TaskList goalId={goalId} done={true} />
        </div>
      </div>
    </section>
  );
}
