import sendRequest from './send-request';
const BASE_URL = '/api/routes';

export async function createRoute(routeData) {
  return sendRequest(BASE_URL, 'POST', routeData);
}

export async function getRoutes() {
  return sendRequest(BASE_URL);
}
