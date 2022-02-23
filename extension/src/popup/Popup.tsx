import React, { useEffect } from "react";
import { Landing } from "./pages/Landing";
import "./Popup.scss";

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return <div className="popupContainer"><Landing/></div>;
}
