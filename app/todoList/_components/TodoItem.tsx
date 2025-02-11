import { useDeleteTodoMutation } from '@/hooks/useDeleteTodoMutation';
import { useUpdateTodoStatusMutation } from '@/hooks/useUpdateTodoStatusMutation';
import FlagIcon from '@/public/images/icons/flag-icon.svg';

import { CheckedIcon } from './CheckedIcon';
import KebabMenu from '../../../components/kebab/KebabMenu';

import type { TodoType } from '@/types/todoTypes';
import type { QueryClient } from '@tanstack/react-query';

interface TodoItemProps {
  todo: TodoType;
  queryClient: QueryClient;
}

export default function TodoItem({ todo, queryClient }: TodoItemProps) {
  const mutation = useDeleteTodoMutation(queryClient);
  const toggleMutation = useUpdateTodoStatusMutation(queryClient);

  const handleDelete = () => {
    mutation.mutate(todo.id);
  };

  // TODO: 할 일 수정 모달 열림
  const handleOpenEditModal = () => {
    alert('수정하기');
  };

  const handleCheckbox = () => {
    toggleMutation.mutate({ id: todo.id, done: !todo.done });
  };

  return (
    <li className="group relative mb-3 flex justify-between">
      <div className="flex items-start gap-2 group-hover:text-[#F86969]">
        <div className="relative flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={handleCheckbox}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-[6px] border border-slate-300 object-contain transition-all checked:border-[#F86969] checked:bg-[#F86969]"
          />
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-0 peer-checked:opacity-100">
            <CheckedIcon />
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className={todo.done ? 'line-through' : ''}>{todo.title}</span>

          {todo.goal?.id && (
            <span className="flex items-center gap-1 text-[13px] text-[#C0C0C0]">
              <FlagIcon />
              {todo.goal.title}
            </span>
          )}
        </div>
      </div>
      <div className="relative flex gap-1">
        {/* TODO: 디자인 확정 후 SVG 아이콘으로 대체  */}
        {todo.filePath && <span>📂</span>}
        {todo.linkUrl && <span>🔗</span>}
        {todo.noteId && <span>📄</span>}
        {!todo.filePath && (
          <button className="hidden group-focus-within:block group-hover:block group-focus:block">
            ✏️
          </button>
        )}
        <KebabMenu onEdit={handleOpenEditModal} onDelete={handleDelete} />
      </div>
    </li>
  );
}
