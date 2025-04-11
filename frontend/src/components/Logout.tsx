import { useNavigate } from 'react-router-dom';

function Logout(props: { children: React.ReactNode }) {
  const navigate = useNavigate();

  // Handles logout logic when the user clicks the link
  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default anchor navigation

    try {
      // Send a logout request to the backend
      const response = await fetch(
        'https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/logout',
        {
          method: 'POST',
          credentials: 'include', // Include cookies for authentication
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // If logout succeeds, navigate to login/home page
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Logout error:', error);
    }
  };

  return (
    // Render a logout link that wraps the provided children
    <a className="logout" href="#" onClick={handleLogout}>
      {props.children}
    </a>
  );
}

export default Logout;
