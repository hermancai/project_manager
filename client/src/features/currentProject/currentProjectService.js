import axios from "axios";

const API_URL = "/api/project";

// POST /api/project
const getData = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, id, config);
  return response.data;
};

// PUT /api/project
const editProject = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, data, config);
  return response.data;
};

// POST /api/project/task
const addTask = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "/task", data, config);
  return response.data;
};

// DELETE /api/project/task
const deleteTask = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const response = await axios.delete(API_URL + "/task", config);
  return response.data;
};

// PUT /api/project/task
const editTask = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "/task", data, config);
  return response.data;
};

const currentProjectService = {
  getData,
  editProject,
  addTask,
  deleteTask,
  editTask,
};

export default currentProjectService;
