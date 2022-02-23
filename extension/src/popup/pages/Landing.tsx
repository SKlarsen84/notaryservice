import FindInPageIcon from "@mui/icons-material/FindInPage";
import GavelIcon from "@mui/icons-material/Gavel";
import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { SetStateAction, useState } from "react";

import {
  HorizontalRule,
  MainContainer,
} from "./components/styledComponents";
import { Notarize } from "./Notarize";

interface Result {
  name: string;
  hash: string;
  msg: string;
  txOK: boolean;
}

export const Landing = () => {
  const [pageState, setPageState] = useState(0);

  const handleTabChange = (_event: any, newValue: SetStateAction<number>) => {
    setPageState(newValue);
  };

  return (
    <MainContainer>
      <Tabs
        value={pageState}
        onChange={handleTabChange}
        aria-label="icon tabs example"
      >
        <Tab icon={<GavelIcon />} label="NOTARIZE FILES" />
        <Tab icon={<FindInPageIcon />} label="CHECK FILES" />
      </Tabs>
      <HorizontalRule />
      {pageState === 0 ? <Notarize></Notarize> : <>Check files TBA</>}
    </MainContainer>
  );
};
