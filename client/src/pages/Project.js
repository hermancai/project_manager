import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { getProject, resetProject } from "../features/currentProject/currentProjectSlice";
import Spinner from "../components/Spinner";
import TaskTable from "../components/tasks/TaskTable";

function Project() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { project, isLoading } = useSelector((state) => state.currentProject);

  useEffect(() => {
    dispatch(getProject({ id: location.pathname.split("/")[2] }));

    return () => {
      dispatch(resetProject());
    };
  }, [location.pathname, dispatch, navigate]);

  const goBack = () => {
    navigate("/projects");
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col w-[90%] py-8 gap-6 text-slate-900">
        <div className="customButton w-min" onClick={goBack}>
          <ArrowNarrowLeftIcon className="h-5" />
          Back
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col divide-y gap-6">
            <div className="whitespace-pre-wrap">
              <h1 className="text-3xl underline mb-3">{project.name}</h1>
              <p>
                <span className="italic">Description:</span>
                <br />
                {project.description ?? <span className="text-gray-600 italic">N/A</span>}
              </p>
            </div>
            <TaskTable />
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;
