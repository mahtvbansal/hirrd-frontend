import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { BarLoader } from "react-spinners";
import { apiRequest } from "@/lib/api";
import { AccountContext } from "@/context/AccountContext";

const Onboarding = () => {
  // const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const {user,setUser} = useContext(AccountContext)

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    try {
      await apiRequest({
        url: "/api/v1/users/role",
        method: "POST",
        data: {
          role,
        },
      });
      setUser({...user, role})
      navigateUser(role)
    } catch (error) {
      console.log(error)
    }
    
  };

  // if (!isLoaded) {
  //   return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  // }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
