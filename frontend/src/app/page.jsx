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
      Cookies.set("authToken", response.data.token, { expires: 7 });
      router.push("/dashboard");
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
      Cookies.set("authToken", response.data.token, { expires: 7 });
      router.push("/dashboard");
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Tabs
        defaultValue={activeTab}
        className="w-full max-w-md"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your information to create a new account
              </CardDescription>
            </CardHeader>

            <CardContent>
              {signupError && (
                <Alert variant="destructive" className="mb-4">
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
                    autoComplete="email"
                    required
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
                    value={signupData.password}
                    onChange={handleSignupChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
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

            <CardFooter className="flex justify-center border-t p-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                  onClick={() => setActiveTab("login")}
                >
                  Log in
                </button>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              {loginError && (
                <Alert variant="destructive" className="mb-4">
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
                    autoComplete="email"
                    required
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <button
                      type="button"
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
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

            <CardFooter className="flex justify-center border-t p-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                  onClick={() => setActiveTab("signup")}
                >
                  Sign up
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
