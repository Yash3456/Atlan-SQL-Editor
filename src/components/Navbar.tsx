import { styled } from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const NavbarContainer = styled.header`
  background-color: var(--header-bg);
  color: var(--header-text);
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: auto;
  margin: 0 auto;
`;

const AppTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const AppLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 600px) {
    gap: 0.5rem;
  }
`;

const UserName = styled.span`
  font-weight: 500;

  @media (max-width: 600px) {
    display: none;
  }
`;

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <NavbarContainer>
      <NavbarContent>
        <AppLogo>
          <FormatListBulletedIcon fontSize="medium" />
          <AppTitle>SQL Editor</AppTitle>
        </AppLogo>
        {user && (
          <UserInfo>
            <LogoutButton onClick={logout}>LOGOUT</LogoutButton>
          </UserInfo>
        )}
      </NavbarContent>
    </NavbarContainer>
  );
}
