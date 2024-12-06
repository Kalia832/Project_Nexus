import React from "react";
import Navbar from "../components/Navbar";

import EventList from "../components/EventList";
import RecordsByCategory from "../components/RecordsByCategory";

function Home() {
  return (
    <>
      <Navbar />
      <RecordsByCategory />
      <EventList />
    </>
  );
}

export default Home;
