import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProjects, resetProjects } from "../features/projects/projectSlice";
import { setActiveForm } from "../features/modal/modalSlice";
import { PlusIcon, PencilIcon } from "@heroicons/react/solid";
import ProjectCard from "../components/ProjectCard";
import Spinner from "../components/Spinner";

function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading, isError, message } = useSelector((state) => state.projects);

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (!user) {
      navigate("/");
    }

    dispatch(getProjects());

    return () => {
      dispatch(resetProjects());
    };
  }, [user, isError, message, dispatch, navigate]);

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-[90%] py-8 gap-6">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-4xl sm:text-5xl text-slate-900">Projects</h1>
            <div className="customButton" onClick={() => dispatch(setActiveForm("addProject"))}>
              <PlusIcon className="h-5" />
              New Project
            </div>
          </div>

          {isLoading ? (
            <Spinner />
          ) : projects.length === 0 ? (
            <p className="text-slate-900 text-xl py-5">No projects found!</p>
          ) : (
            <>
              <p className="flex text-slate-900 italic">
                Click on <PencilIcon className="h-5 mx-2" /> to manage a project.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-5">
                {projects.map((project) => (
                  <ProjectCard data={project} key={project._id} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Projects;
