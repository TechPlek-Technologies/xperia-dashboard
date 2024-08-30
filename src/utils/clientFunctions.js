import axios from 'axios';

export async function postData(url, data) {
  const axios = (await import('axios')).default;
  // Retrieve the service token from local storage
  const serviceToken = localStorage.getItem('serviceToken');

  const response = await axios({
    method: 'post',
    url,
    data: data,
    headers: {
      Authorization: `Bearer ${serviceToken}`
    }
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.message);
      const errData = { success: false, err: error.message };
      return errData;
    });

  return response;
}

export async function getData(url, params = {}) {
  const axios = (await import('axios')).default;

  // Retrieve the service token from local storage
  const serviceToken = localStorage.getItem('serviceToken');

  try {
    const response = await axios({
      method: 'get',
      url,
      headers: {
        Authorization: `Bearer ${serviceToken}`
      },
      params: params // Add query parameters here
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.log(error.message);
    return { success: false, err: error.message };
  }
}

export async function deleteData(url, params = {}) {
  const axios = (await import('axios')).default;

  // Retrieve the service token from local storage
  const serviceToken = localStorage.getItem('serviceToken');

  const response = await axios({
    method: 'delete',
    url,
    headers: {
      Authorization: `Bearer ${serviceToken}`,
      'Content-Type': 'application/json' // Optional, depending on your server requirements
    },
    params: params // Add query parameters here if needed
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.message);
      const errData = { success: false, err: error.message };
      return errData;
    });

  return response;
}

export const addNewFilesLocal = async (file) => {
  try {
    const data = new FormData();
    data.append('file', file);
    const resp = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/uploads/`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => res.data);
    if (resp.success) {
      return {
        success: resp.success,
        name: resp.name,
        url: resp.url
      };
    } else {
      throw new Error('Something Went Wrong ' + resp.err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeFile = async (fileName) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/uploads?name=${fileName}`
    }).then((res) => res.data);
  } catch (err) {
    console.log(err);
  }
};

export const generateSlug = (text) => {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Trim leading/trailing spaces
    .replace(/[^\w\s-]/g, '') // Remove all non-word chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export const formatDate = (isoDateStr) => {
  const date = new Date(isoDateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};
