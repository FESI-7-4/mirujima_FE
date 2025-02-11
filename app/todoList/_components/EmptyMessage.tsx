import { EMPTY_MESSAGES } from '@/constant/emtymessage';

import type { FilterType } from './TodoFilter';
import type { TodoType } from '@/types/todoTypes';

interface EmptyMessageProps {
  filter: FilterType;
  filteredTodos: TodoType[];
}

export default function EmptyMessage({ filter, filteredTodos }: EmptyMessageProps) {
  if (filteredTodos.length > 0) return null;

  return <p>{EMPTY_MESSAGES[filter]}</p>;
}
