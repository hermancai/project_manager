import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetModal } from "../../features/modal/modalSlice";
import { editTask } from "../../features/currentProject/currentProjectSlice";

function EditTaskForm() {
  const dispatch = useDispatch();
  const { currentTask } = useSelector((state) => state.modal);

  const [inputs, setInputs] = useState({
    description: currentTask.description ?? "",
    completed: currentTask.completed,
    priority: currentTask.priority,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((values) => ({ ...values, [e.target.name]: value }));
  };

  const handleSubmit = (e) => e.preventDefault();

  const handleEdit = () => {
    if (!inputs.description) return setError("Task description is required.");

    dispatch(
      editTask({
        projectId: currentTask.project,
        taskId: currentTask._id,
        description: inputs.description,
        priority: parseInt(inputs.priority),
        completed: inputs.completed,
      })
    );
    dispatch(resetModal());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h1 className="text-2xl">Edit Task</h1>
      <textarea
        rows={2}
        name="description"
        placeholder="Description"
        type="text"
        className="grayInput w-full"
        value={inputs.description}
        onChange={handleChange}
      />
      <label>
        Priority:
        <select
          name="priority"
          value={inputs.priority}
          onChange={handleChange}
          className="mx-3 border border-slate-900 rounded-sm bg-white p-1"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          className="h-5 w-5"
          type="checkbox"
          name="completed"
          checked={inputs.completed}
          onChange={handleChange}
        />
        Task is complete
      </label>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex flex-row justify-evenly mt-6 gap-10">
        <button
          type="button"
          className="rounded basis-1/2 px-10 py-2 bg-red-300 hover:bg-red-400"
          onClick={() => dispatch(resetModal())}
        >
          Cancel
        </button>
        <button
          type="button"
          className="rounded basis-1/2 px-10 py-2 bg-green-200 hover:bg-green-300"
          onClick={handleEdit}
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;
