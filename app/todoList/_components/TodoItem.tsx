import type { Todo } from '@/types/todoTypes';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li>
      <input type="checkbox" checked={todo.done} />
      <span>{todo.title}</span>
    </li>
  );
}
