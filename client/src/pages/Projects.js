import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProjects, reset } from "../features/projects/projectSlice";
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
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, navigate]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1>Welcome, {user && user.username}</h1>
    </div>
  );
}

export default Projects;
