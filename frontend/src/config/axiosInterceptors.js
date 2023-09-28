import axios from 'axios';

// Step 1: Axios Instance
// Create a new instance of axios with the default configurations.
// You can customize this instance with default headers, baseURL, etc.
const axiosInterceptorsInstance = axios.create();

// Step 2: Axios Request Interceptor
// This is invoked before any request is sent.
axiosInterceptorsInstance.interceptors.request.use(
  (config) => {
    // Get the access token from localStorage.
    const localStorageUserInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;

    const accessToken = localStorageUserInfo
      ? localStorageUserInfo.accessToken
      : null;

    // If the token exists, set it to the request's Authorization header.
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }

    return config;
  },
  (error) => {
    // The error in the request interceptor is about client-side issues before sending the request.
    return Promise.reject(error); // Reject the promise with the error
  }
);

// Step 3: Axios Response Interceptor
// This is invoked once a response is received.
axiosInterceptorsInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    // Extract original request and the response from error
    const originalRequest = error.config;
    const responseStatus = error.response ? error.response.status : null;

    // Check if the response status is 401, indicating token expiration.
    // Also check if it's not a request to refresh the token itself.
    // The originalRequest._retry flag ensures we don't end up in an infinite loop of retries.
    if (responseStatus === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Use the environment variable for the base API URL
      const apiBaseUrl = process.env.API_URL || ''; // Fallback to an empty string if not defined

      // const response = await axios.post('/api/user/refresh-token');
      const response = await axios.post(`${apiBaseUrl}/api/user/refresh-token`);

      // If refresh was successful, update the access token in localStorage
      if (response.status === 201) {
        // localStorage.setItem('accessToken', res.data.accessToken);

        // Get current userInfo from localStorage
        const localStorageUserInfo = JSON.parse(
          localStorage.getItem('userInfo')
        );

        // Update accessToken in the userInfo object
        localStorageUserInfo.accessToken = response.data.accessToken;

        // Set the updated userInfo back to localStorage
        localStorage.setItem('userInfo', JSON.stringify(localStorageUserInfo));

        // Update the authorization header for the original request and re-send it.
        originalRequest.headers['Authorization'] =
          'Bearer ' + response.data.accessToken;
        return axiosInterceptorsInstance(originalRequest);
      }
    }

    //The error in the response interceptor is about issues with the response from the server, after the request has been made.
    return Promise.reject(error);
  }
);

export { axiosInterceptorsInstance };
