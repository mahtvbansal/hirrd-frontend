import { apiRequest } from "@/lib/api";
import { createContext, useCallback, useEffect, useState } from "react";
const AccountContext = createContext({});

const AccountProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt") && !user) {
      setLoading(true);
      apiRequest({
        url: "/api/v1/users/details",
      })
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.log(err);
          // window.location.href = '/signin'
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <AccountContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext };
export default AccountProvider;
