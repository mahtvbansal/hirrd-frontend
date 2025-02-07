import { createContext, useState } from "react";
const AccountContext = createContext({});

const AccountProvider = ({ children }) => {
  // need to authenticate the user first
  let userData = null;
  if (localStorage.getItem("jwt")) {
    userData = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      username: localStorage.getItem("username"),
      uid : localStorage.getItem("uid"),
    };
  }
  const [user, setUser] = useState(userData);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext };
export default AccountProvider;
