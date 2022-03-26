import { useDispatch, useSelector } from "react-redux";
import { resetModal } from "../../features/modal/modalSlice";
import { deleteTask } from "../../features/currentProject/currentProjectSlice";

function DeleteTaskForm() {
  const dispatch = useDispatch();
  const { currentTask } = useSelector((state) => state.modal);

  const handleDelete = () => {
    dispatch(
      deleteTask({
        taskId: currentTask._id,
        projectId: currentTask.project,
        completed: currentTask.completed,
      })
    );
    dispatch(resetModal());
  };

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-slate-900">
        Are you sure you want to delete this task?
      </h3>
      <div className="flex flex-row justify-evenly mt-6">
        <button
          type="button"
          className="text-white rounded px-10 py-2 bg-slate-700 hover:bg-slate-900"
          onClick={() => dispatch(resetModal())}
        >
          No
        </button>
        <button
          type="button"
          className="rounded px-10 py-2 bg-red-300 hover:bg-red-400"
          onClick={handleDelete}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default DeleteTaskForm;
