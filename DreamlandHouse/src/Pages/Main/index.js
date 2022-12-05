import React from "react";
import MainDetails from "./MainDetails";
import MainExperts from "./MainExperts";
import MainFeature from "./MainFeature";
import MainLandingContent from "./MainLandingContent";

export default function Main() {
  return (
    <>
      <MainLandingContent />
      <MainDetails />
      <MainFeature />
      <MainExperts />
    </>
  );
}
