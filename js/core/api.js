const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_PHOTOS: '/data',
  SEND_FORM: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const request = async (route, method = Method.GET, body = null) => {
  const response = await fetch (`${BASE_URL}${route}`, {
    method,
    body,
  });
  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
  }
  if (method === Method.GET) return response.json();

  return response;
};

export const getPhotos = () => request(Route.GET_PHOTOS, Method.GET);
export const sendForm = (formData) => request(Route.SEND_FORM, Method.POST, formData);
