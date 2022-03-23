import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetModal } from "../features/modal/modalSlice";
import { editProject } from "../features/currentProject/currentProjectSlice";

function EditProjectForm() {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.currentProject.project);

  const [inputs, setInputs] = useState({
    name: project.name,
    description: project.description ?? "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => e.preventDefault();

  const handleEdit = () => {
    if (!inputs.name) return setError("Project name is required.");

    const body = {
      id: project._id,
      name: inputs.name,
      description: inputs.description ?? undefined,
    };

    dispatch(editProject(body));
    dispatch(resetModal());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h1 className="text-2xl">Edit Project</h1>
      <input
        name="name"
        placeholder="Name"
        type="text"
        className="grayInput w-full"
        value={inputs.name}
        onChange={handleChange}
      />
      <textarea
        rows={2}
        name="description"
        placeholder="Description"
        type="text"
        className="grayInput w-full"
        value={inputs.description}
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
          onClick={handleEdit}
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default EditProjectForm;
