import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from "@material-ui/core/IconButton";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    

    <IconButton style={{color: 'white', marginLeft:'0'}} onClick={() => logout({ returnTo: window.location.origin })}>
          <ExitToAppIcon />
      </IconButton>

    // <button onClick={() => logout({ returnTo: window.location.origin })}>
    //   Log Out
    // </button>
  );
};

export default LogoutButton;