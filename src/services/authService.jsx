import * as userService from "../services/UserService.jsx";


export const login = async (credentials) => {
  try {
    const response = await userService.createUser(credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
