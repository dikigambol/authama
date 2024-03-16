import axios from "axios";

const instance = axios.create({
  baseURL: `/api/`,
  withCredentials: true,
});

export async function get(route, params = {}) {
  return await instance
    .get(`${route}`, { params })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export function post(route, body = {}) {
  return instance
    .post(`${route}`, body)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function login(email, password) {
  return await post("login", { email, password });
}

export async function isAuth(token) {
  if (token != null) {
    const res = await post("verifyToken", { token });
    if (res.status) {
      return true
    } else {
      window.location.replace("/")
    }
  } else {
    window.location.replace("/")
  }
}