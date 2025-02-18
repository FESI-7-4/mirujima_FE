import { debounce } from 'lodash';

import { useTodoCreateModalStore } from '@/provider/store-provider';

export default function TitleInput() {
  const { title, setCreatedTodoState } = useTodoCreateModalStore((state) => state);

  const handleInputChange = debounce((e) => {
    setCreatedTodoState({ title: e.target.value });
  }, 50);

  return (
    <div className="flex flex-col">
      <label className="mb-4 font-semibold">제목</label>
      <input
        name="title"
        placeholder="할 일의 제목을 적어주세요"
        maxLength={30}
        required
        className="rounded-lg border border-gray-200 px-4 py-[14px] placeholder-gray350"
        onChange={handleInputChange}
        defaultValue={title}
      />
    </div>
  );
}
