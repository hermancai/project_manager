import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowNarrowLeftIcon, PencilIcon } from "@heroicons/react/solid";
import { getProject, resetProject } from "../features/currentProject/currentProjectSlice";
import { setActiveForm } from "../features/modal/modalSlice";
import Spinner from "../components/Spinner";
import TaskTable from "../components/tasks/TaskTable";
import { toast } from "react-toastify";

function Project() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { project, isLoading, message } = useSelector((state) => state.currentProject);

  useEffect(() => {
    if (message) toast.info(message);
  }, [message]);

  useEffect(() => {
    dispatch(getProject({ id: location.pathname.split("/")[2] }));

    return () => {
      dispatch(resetProject());
    };
  }, [location.pathname, dispatch, navigate]);

  const goBack = () => {
    navigate("/projects");
  };

  const handleOnClick = (action) => {
    dispatch(setActiveForm(action));
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col w-[90%] py-8 gap-6 text-slate-900">
        <div className="customButton w-min" onClick={goBack}>
          <ArrowNarrowLeftIcon className="h-5" />
          Projects
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col divide-y gap-6">
            <div className="whitespace-pre-wrap">
              <h1 className="text-3xl underline mb-3 max-w-full break-words">{project.name}</h1>
              <p>
                <span className="italic">Description:</span>
                <br />
                {project.description ?? <span className="text-gray-600 italic">N/A</span>}
              </p>
              <div className="flex pt-6 gap-6 justify-between sm:justify-start">
                <button className="customButton" onClick={() => handleOnClick("editProject")}>
                  <PencilIcon className="h-5" /> Edit Project
                </button>
                <button
                  className="p-3 bg-red-300 hover:bg-red-400 rounded cursor-pointer"
                  onClick={() => handleOnClick("deleteProject")}
                >
                  Delete Project
                </button>
              </div>
            </div>
            <TaskTable />
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;
