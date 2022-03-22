import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../features/projects/projectSlice";
import { resetModal } from "../features/modal/modalSlice";

function AddProjectForm() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => e.preventDefault();

  const handleSave = () => {
    if (!inputs.name) return setError("A project name is required.");

    dispatch(createProject({ name: inputs.name, description: inputs.description }));
    dispatch(resetModal());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h1 className="text-2xl">Add New Project</h1>
      <input
        name="name"
        placeholder="Name"
        type="text"
        className="grayInput w-full"
        value={inputs.name || ""}
        onChange={handleChange}
      />
      <textarea
        rows={2}
        name="description"
        placeholder="Description"
        type="text"
        className="grayInput w-full"
        value={inputs.description || ""}
        onChange={handleChange}
      />
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
          onClick={handleSave}
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default AddProjectForm;
