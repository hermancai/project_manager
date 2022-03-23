import axios from "axios";

const API_URL = "/api/projects";

const createProject = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);
  return response.data;
};

const getProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(API_URL, config);
  return response.data;
};

const deleteProject = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const projectService = {
  createProject,
  getProjects,
  deleteProject,
};

export default projectService;
