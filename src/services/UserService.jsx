import axios from "axios";

const USER_BASE_API_URL = "http://localhost:8080/user";

export async function getAllUsers() {
  return axios.get(USER_BASE_API_URL);
}

export async function createUser(user) {
  return axios.post(USER_BASE_API_URL, user);
}

export async function getUserById(id) {
  return axios.get(`${USER_BASE_API_URL}/${id}`);
}

export async function getUserByUsername(name) {
  return axios.get(`${USER_BASE_API_URL}/name/${name}`);
}

export async function updateUser(id, user) {
  return axios.put(`${USER_BASE_API_URL}/${id}`, user);
}

export async function deleteUser(id) {
  return axios.delete(`${USER_BASE_API_URL}/${id}`);
}