"use client"
import React from "react";
import Portfolio from "@/app/dashboard/[userId]/components/Portfolio";
import PortfolioDetails from "@/app/dashboard/[userId]/components/PortfolioDetails";

const Page = () => {
  return (
    <div>
      <Portfolio />
      {/* If you want to show PortfolioDetails too, uncomment below */}
      {/* <PortfolioDetails /> */}
    </div>
  );
};

export default Page;
