"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AuthForms from "@/components/AuthComponent";
import Hero from "@/components/ui/Hero";
import Features from "@/components/ui/Features";
import HowItWorks from "@/components/ui/HowItWorks";
import About from "@/components/ui/About";
import Testimonials from "@/components/ui/Testimonials";
import Contact from "@/components/ui/Contact";

const HomePage = ({ params }) => {
  const router = useRouter();
  const authToken = Cookies.get("authToken");

  // Check if user is authenticated and redirect to their portfolio if so
  //   useEffect(() => {
  //     if (authToken) {
  //       // Assuming we can get userId from somewhere (e.g., token or API call)
  //       // For now, we'll redirect to a portfolio route if authenticated
  //       // You might need to fetch userId from an API using the token
  //       router.push("/portfolio"); // Adjust this route based on your setup
  //     }
  //   }, [authToken, router]);

  // If authenticated, this won't render due to the redirect
  // If unauthenticated, show the landing page
  console.log(params.userId);
  return (
    <div>
      <>
        <Hero />
        <Features />
        <HowItWorks userId={params.userId} />
        <About />
        <Testimonials />
        <Contact />
      </>
    </div>
  );
};

export default HomePage;
