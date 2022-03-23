import { useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/solid";

function ProjectCard({ data }) {
  const navigate = useNavigate();

  const goToProject = () => {
    navigate("/project/" + data._id);
  };

  return (
    <div className="flex flex-col border border-slate-900 rounded w-full whitespace-pre-wrap overflow-hidden">
      <div className="flex items-center justify-between text-white bg-slate-900 p-3">
        <h3 className="font-bold break-words max-w-[80%]">{data.name}</h3>
        <div className="p-3 hover:bg-slate-700 rounded-full cursor-pointer" onClick={goToProject}>
          <PencilIcon className="h-5" />
        </div>
      </div>

      <p className="p-3 grow max-h-[200px] overflow-auto">
        <span className="italic">Description:</span>
        <br />
        {data.description ?? <span className="text-gray-600 italic">N/A</span>}
      </p>
      <p className="p-3 bg-slate-200">Tasks: {data.taskCount}</p>
    </div>
  );
}

export default ProjectCard;
