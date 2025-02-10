import { deleteTodoItem } from '@/api/todo';

import KebabMenu from '../../../components/kebab/KebabMenu';

import type { Todo } from '@/types/todoTypes';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const handleOpenEditModal = () => {
    alert('수정하기');
  };

  const handleDelete = () => {
    deleteTodoItem(todo.id);
  };

  return (
    <li className="group relative flex justify-between">
      <div>
        <input type="checkbox" checked={todo.done} />
        <span>{todo.title}</span>
      </div>
      <div className="relative flex gap-1">
        {/* TODO: 디자인 확정 후 SVG 아이콘으로 대체  */}
        {todo.fileUrl && <span>📂</span>}
        {todo.linkUrl && <span>🔗</span>}
        {todo.noteId && <span>📄</span>}
        {!todo.fileUrl && (
          <button className="hidden group-focus-within:block group-hover:block group-focus:block">
            ✏️
          </button>
        )}
        <KebabMenu onEdit={handleOpenEditModal} onDelete={handleDelete} />
      </div>
    </li>
  );
}
