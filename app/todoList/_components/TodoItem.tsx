import type { Todo } from '@/types/todoTypes';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="group relative flex justify-between">
      <div>
        <input type="checkbox" checked={todo.done} />
        <span>{todo.title}</span>
      </div>
      <div className="flex gap-1">
        {/* TODO: 디자인 확정 후 SVG 아이콘으로 대체  */}
        {todo.fileUrl && <span>📂</span>}
        {todo.linkUrl && <span>🔗</span>}
        {todo.noteId && <span>📄</span>}
        {!todo.fileUrl && <span className="hidden group-hover:block">✏️</span>}
        <span className="hidden group-hover:block">⁝</span>
      </div>
    </li>
  );
}
