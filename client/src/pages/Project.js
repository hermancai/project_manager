import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { getProject, resetProject } from "../features/currentProject/currentProjectSlice";
import Spinner from "../components/Spinner";

function Project() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];
  const { project, isLoading } = useSelector((state) => state.currentProject);

  useEffect(() => {
    if (!project) return navigate("/projects");

    dispatch(getProject({ id: projectId }));

    // TODO: spinner. get bugs and tasks from DB. Build bug and task tables
    // TODO: options to delete and edit project
  }, []);

  const goBack = () => {
    dispatch(resetProject());
    navigate("/projects");
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col w-[90%] py-8 gap-6 text-slate-900">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="customButton w-min" onClick={goBack}>
              <ArrowNarrowLeftIcon className="h-5" />
              Back
            </div>
            <h1 className="text-3xl underline">{project.name}</h1>
            <div className="whitespace-pre-wrap">
              <p className="italic">Description:</p>
              <p>{project.description ?? "None"}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Project;
