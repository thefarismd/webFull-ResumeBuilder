import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
  // Use the isAuthenticated function to determine if the user is authenticated
  if (isAuthenticated()) {
    return children;
  }

  // If the user is not authenticated, navigate them to the login page
  return <Navigate to='/login' />;
}

export default PrivateRoute;

function isAuthenticated() {
  // Retrieve the user data from localStorage
  const userInfo = localStorage.getItem('userInfo');

  // Check if the data exists and if it has a token property
  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo);
    return !!parsedUserInfo.accessToken;
  }

  // If the above conditions aren't met, return false
  return false;
}
