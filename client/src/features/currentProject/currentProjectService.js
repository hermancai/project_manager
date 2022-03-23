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

  const response = await axios.put(`${API_URL}/${data.id}`, data, config);
  console.log(response.data);
  return response.data;
};

const addTask = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "/addTask", data, config);
  console.log(response.data);
  return response.data;
};

const deleteTask = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "/deleteTask", id, config);
  console.log(response.data);
  return response.data;
};

const editTask = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "/editTask", data, config);
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
