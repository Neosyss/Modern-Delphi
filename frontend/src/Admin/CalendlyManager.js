import React, { useEffect } from "react";
import { InlineWidget } from "react-calendly";

const CalendlyManager = () => {
  useEffect(() => {
    const handleEvent = (event) => {
      if (event.data.event === "calendly.event_scheduled") {
        console.log("Meeting scheduled:", event.data.payload);
        alert("Your meeting has been successfully scheduled!");
        // You can also trigger other actions, like updating state or sending data to the backend
      }
    };

    window.addEventListener("message", handleEvent);

    return () => {
      window.removeEventListener("message", handleEvent);
    };
  }, []);

  return (
    <div className="App">
      <InlineWidget url="https://calendly.com/mujtabashafqat0" />
    </div>
  );
};

export default CalendlyManager;
