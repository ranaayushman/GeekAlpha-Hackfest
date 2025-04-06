"use client";

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ReloadIcon } from "@radix-ui/react-icons";

const baseURL = process.env.NEXT_PUBLIC_API_USER_URL;

const AuthForms = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("signup");

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError("");
    setSignupLoading(true);

    try {
      const response = await axios.post(`${baseURL}/signup`, signupData);
      const { token, userId } = response.data; // Added userId extraction

      // Store both token and userId in cookies
      Cookies.set("authToken", token, { expires: 7 });
      Cookies.set("userId", userId, { expires: 7 }); // Store userId in cookie

      router.push(`/dashboard/${userId}`);
    } catch (err) {
      setSignupError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSignupLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const response = await axios.post(`${baseURL}/signin`, loginData);
      const { token, userId } = response.data;

      // Store both token and userId in cookies
      Cookies.set("authToken", token, { expires: 7 });
      Cookies.set("userId", userId, { expires: 7 }); // Store userId in cookie

      router.push(`/${userId}`);
    } catch (err) {
      setLoginError(
        err.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <Tabs
        defaultValue={activeTab}
        className="w-full max-w-md"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full h-full grid-cols-2 mb-6 bg-gray-800 rounded-lg p-1">
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black rounded-md py-2"
          >
            Sign Up
          </TabsTrigger>
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black rounded-md py-2"
          >
            Login
          </TabsTrigger>
        </TabsList>

        {/* Sign Up Form */}
        <TabsContent value="signup">
          <Card className="bg-black text-white border border-gray-700">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-yellow-400">
                Create an Account
              </CardTitle>
              <CardDescription className="text-gray-400">
                Enter Your Details Below
              </CardDescription>
            </CardHeader>

            <CardContent>
              {signupError && (
                <Alert
                  variant="destructive"
                  className="mb-4 bg-red-500/20 text-red-400 border-red-400"
                >
                  <AlertDescription>{signupError}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSignupSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                      value={signupData.firstName}
                      onChange={handleSignupChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                      value={signupData.lastName}
                      onChange={handleSignupChange}
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="bg-gray-800 border-gray-600 text-white"
                    value={signupData.email}
                    onChange={handleSignupChange}
                  />
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="bg-gray-800 border-gray-600 text-white"
                    value={signupData.password}
                    onChange={handleSignupChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                  disabled={signupLoading}
                >
                  {signupLoading ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4" />
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex justify-center border-t border-gray-700 p-4">
              <p className="text-sm text-gray-400">
                Already Have an Account?{" "}
                <button
                  type="button"
                  className="text-yellow-400 hover:text-yellow-500 font-medium"
                  onClick={() => setActiveTab("login")}
                >
                  Log In
                </button>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Login Form */}
        <TabsContent value="login">
          <Card className="bg-black text-white border border-gray-700">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-yellow-400">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-400">
                Enter Your Credentials
              </CardDescription>
            </CardHeader>

            <CardContent>
              {loginError && (
                <Alert
                  variant="destructive"
                  className="mb-4 bg-red-500/20 text-red-400 border-red-400"
                >
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLoginSubmit}>
                <div className="space-y-2 mb-4">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="bg-gray-800 border-gray-600 text-white"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="bg-gray-800 border-gray-600 text-white"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                  disabled={loginLoading}
                >
                  {loginLoading ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4" />
                      Logging in...
                    </>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex justify-center border-t border-gray-700 p-4">
              <p className="text-sm text-gray-400">
                Don't Have an Account?{" "}
                <button
                  type="button"
                  className="text-yellow-400 hover:text-yellow-500 font-medium"
                  onClick={() => setActiveTab("signup")}
                >
                  Sign Up
                </button>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForms;
