import { XIcon, PencilIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { setCurrentTask, setActiveForm } from "../../features/modal/modalSlice";

function TaskOptions({ data }) {
  const dispatch = useDispatch();

  const onClickDelete = () => {
    dispatch(setCurrentTask(data));
    dispatch(setActiveForm("deleteTask"));
  };

  return (
    <div className="flex gap-3 text-slate-900 items-center justify-evenly">
      <button className="cursor-pointer hover:bg-gray-300 rounded-full p-2" onClick={() => onClickDelete()}>
        <XIcon className="h-5 text-red-600" />
      </button>

      <button className="cursor-pointer hover:bg-gray-300 rounded-full p-2">
        <PencilIcon className="h-5" />
      </button>
    </div>
  );
}

export default TaskOptions;
