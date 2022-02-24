import FindInPageIcon from "@mui/icons-material/FindInPage";
import GavelIcon from "@mui/icons-material/Gavel";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useEffect } from "react";
import { SetStateAction, useState } from "react";

import { CheckFiles } from "./CheckFiles";
import {
  HorizontalRule,
  InputContainer,
  MainContainer,
} from "./components/styledComponents";
import { Notarize } from "./Notarize";

export const Landing = () => {
  const [pageState, setPageState] = useState(0);
  const [endpoint, setEndpoint] = useState<string>();

  //get endpoint url from chrome storage settings
  useEffect(() => {
    chrome.storage.sync.get(
      {
        URL: "",
      },
      async function (item) {
        const url = item.URL.length > 0 ? item.URL : "http://127.0.0.1:3000";
        setEndpoint(url);
      }
    );
  }, []);

  const handleTabChange = (_event: any, newValue: SetStateAction<number>) => {
    setPageState(newValue);
  };

  return (
    <MainContainer>
      <Tabs
        TabIndicatorProps={{ style: { background: "#ffffff" } }}
        style={{ background: "#3C3C50", width: "100%" }}
        value={pageState}
        onChange={handleTabChange}
        aria-label="icon tabs example"
      >
        <Tab
          icon={<GavelIcon />}
          style={{ color: "#ffffff", textTransform: "none", fontWeight: 200 }}
          label="Notarize"
        />
        <Tab
          icon={<FindInPageIcon />}
          style={{ color: "#ffffff", textTransform: "none", fontWeight: 200 }}
          label="Check transaction"
        />
      </Tabs>
      <div
        style={{ width: "100%", padding: 10, marginTop: 15, overflow: "auto" }}
      >
        {pageState === 0 ? (
          <Notarize endpoint={endpoint} />
        ) : (
          <CheckFiles endpoint={endpoint} />
        )}
      </div>
    </MainContainer>
  );
};
