import { XIcon, PencilIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { setCurrentTask, setActiveForm } from "../../features/modal/modalSlice";

function TaskOptions({ data }) {
  const dispatch = useDispatch();

  const handleOnClick = (action) => {
    dispatch(setCurrentTask(data));
    dispatch(setActiveForm(action));
  };

  return (
    <div className="flex gap-3 text-slate-900 items-center justify-evenly">
      <button className="cursor-pointer hover:bg-gray-300 rounded-full p-2" onClick={() => handleOnClick("editTask")}>
        <PencilIcon className="h-5" />
      </button>

      <button className="cursor-pointer hover:bg-gray-300 rounded-full p-2" onClick={() => handleOnClick("deleteTask")}>
        <XIcon className="h-5 text-red-600" />
      </button>
    </div>
  );
}

export default TaskOptions;
