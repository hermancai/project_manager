import { XIcon, PencilIcon } from "@heroicons/react/solid";

function TaskOptions({ tableProps }) {
  return (
    <div className="flex gap-3 text-slate-900 items-center justify-evenly">
      <button className="cursor-pointer hover:bg-gray-300 rounded-full p-2">
        <PencilIcon className="h-5" />
      </button>

      <button className="cursor-pointer hover:bg-gray-300 rounded-full p-2">
        <XIcon className="h-5" />
      </button>
    </div>
  );
}

export default TaskOptions;
