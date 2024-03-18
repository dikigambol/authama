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

export async function listProducts(id, token, params = {}) {
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  const queryParams = { id, ...params };
  return await instance
    .get("listProducts", { headers, params: queryParams })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function addProduct(form, token) {
  const headers = {
    'authorization': `Bearer ${token}`
  };
  return await instance
    .post("addProduct", { product: form }, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function editProduct(form, token) {
  const headers = {
    'authorization': `Bearer ${token}`
  };
  return await instance
    .post("updateProduct", { product: form }, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function deleteProduct(id, token, params = {}) {
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  const queryParams = { id, ...params };
  return await instance
    .get("deleteProduct", { headers, params: queryParams })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function findProduct(trx, params = {}) {
  const queryParams = { trx, ...params };
  return await instance
    .get("findProduct", { params: queryParams })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}