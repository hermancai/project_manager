import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetModal } from "../features/modal/modalSlice";
import { deleteProject } from "../features/projects/projectSlice";
import { toast } from "react-toastify";

function DeleteProjectForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectId = useSelector((state) => state.currentProject.project._id);

  const handleDelete = () => {
    dispatch(resetModal());
    dispatch(deleteProject(projectId));
    navigate("/projects");
    toast.success("Project deleted");
  };

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-slate-900">
        Are you sure you want to delete this project? Related tasks and bugs will also be deleted.
      </h3>
      <div className="flex flex-row justify-evenly mt-6">
        <button
          type="button"
          className="text-white rounded px-10 py-2 bg-slate-700 hover:bg-slate-900"
          onClick={() => dispatch(resetModal())}
        >
          No
        </button>
        <button type="button" className="rounded px-10 py-2 bg-red-300 hover:bg-red-400" onClick={handleDelete}>
          Yes
        </button>
      </div>
    </div>
  );
}

export default DeleteProjectForm;
