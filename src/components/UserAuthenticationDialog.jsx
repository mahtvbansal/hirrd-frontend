import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/api";
import { AccountContext } from "@/context/AccountContext";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { ClipLoader } from "react-spinners";

const UserAuthenticationDialog = () => {
  const { user, setUser } = useContext(AccountContext);
  const [open, setOpen] = useState(false);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [stage, setStage] = useState("login");
  const navigate = useNavigate();

  const handleOpenChange = (e) => {
    setStage("login");
    setOpen(e);
  };

  const handleLogin = (response) => {
    if (response.data.token) {

      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("uid", response.data.id);

      setUser({
        name: response.data.name,
        email: response.data.email,
        username: response.data.username,
        uid: response.data.id
      });
      setOpen(false)
      if (!response.data.role) navigate("/onboarding");
    } else {
      throw new Error("Token not available");
    }
  }

  const handleContinue = async () => {
    try {
      if (stage === "login") {
        const response = await apiRequest({
          url: "/api/v1/users/login",
          method: 'POST',
          data: {
            email: email,
            password: password,
          },
        });
        handleLogin(response)
      } else if (stage === "signup") {
        const response = await apiRequest({
          url: "/api/v1/users/signup",
          method: "POST",
          data: {
            name: fullname,
            username: username,
            email: email,
            password: password,
          },
        });
        handleLogin(response)
      }
    } catch (error) {}
  };

  const { loading, fn } = useFetch(handleContinue)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] bg-[#403d76] text-white border-none rounded-lg p-6 shadow-none">
        <DialogHeader className="text-center mb-5">
          <h1 className="text-lg font-bold text-center">
            {stage === "login" ? "Sign in to hirrd" : "Create your account"}
          </h1>
          <p className="text-sm text-center mb-6 text-[#FFFFFFA6]">
            {stage === "login"
              ? "Welcome back! Please sign in to continue"
              : "Welcome! Please fill in the details to get started."}
          </p>
        </DialogHeader>

        <div className="space-y-5">
          {stage === "signup" && (
            <>
              <div>
                <Label
                  htmlFor="fullname"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name
                </Label>
                <Input
                  type="fullname"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className={cn(
                    "w-full rounded-lg border border-zinc-700 px-3 py-2 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                    "placeholder:text-zinc-500",
                    error && "border-red-500 focus:ring-red-500"
                  )}
                  placeholder="Enter your Full Name"
                />
                {/* {error && <p className="text-red-500 mt-1">{error}</p>} */}
              </div>
              <div>
                <Label
                  htmlFor="username"
                  className="block text-sm font-medium mb-1"
                >
                  Username
                </Label>
                <Input
                  type="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={cn(
                    "w-full rounded-lg border border-zinc-700 px-3 py-2 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                    "placeholder:text-zinc-500",
                    error && "border-red-500 focus:ring-red-500"
                  )}
                  placeholder="Enter a unique username"
                />
                {/* {error && <p className="text-red-500 mt-1">{error}</p>} */}
              </div>
            </>
          )}
          <div>
            <Label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "w-full rounded-lg border border-zinc-700 px-3 py-2 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                "placeholder:text-zinc-500",
                error && "border-red-500 focus:ring-red-500"
              )}
              placeholder="Enter your email address"
            />
            {error && <p className="text-red-500 mt-1">{error}</p>}
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "w-full rounded-lg border border-zinc-700 px-3 py-2 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                "placeholder:text-zinc-500",
                error && "border-red-500 focus:ring-red-500"
              )}
              placeholder="Enter your password"
            />
            {error && <p className="text-red-500 mt-1">{error}</p>}
          </div>

          <Button
            className="w-full bg-yellow-400 text-zinc-900 hover:bg-yellow-500 font-medium rounded-lg py-3 px-4"
            onClick={fn}
          >
            {loading ? <ClipLoader size={16} loading={true} /> :"Continue"}
          </Button>
        </div>

        {stage === "login" ? (
          <p className="text-center text-[#FFFFFFA6] text-sm mt-8">
            Don't have an account?{" "}
            <button
              onClick={() => setStage("signup")}
              className="text-yellow-400 font-bold hover:underline"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p className="text-center text-[#FFFFFFA6] text-sm mt-8">
            Already have an account?{" "}
            <button
              onClick={() => setStage("login")}
              className="text-yellow-400 font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserAuthenticationDialog;
