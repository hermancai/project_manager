import axios from "axios";

const API_URL = "/api/project";

const getData = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, id, config);
  console.log(response.data);
  return response.data;
};

const editProject = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, data, config);
  console.log(response.data);
  return response.data;
};

const addTask = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "/task", data, config);
  console.log(response.data);
  return response.data;
};

const deleteTask = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const response = await axios.delete(API_URL + "/task", config);
  console.log(response.data);
  return response.data;
};

const editTask = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "/task", data, config);
  console.log(response.data);
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
