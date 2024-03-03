"use client";

import React from "react";
import InputBox from "../InputBox/InputBox";
import LinkCard from "../GeneratedLinks/LinkCard";

const HomePage = () => {
  const [savedLongLinkList, setSavedLongLinkList] = React.useState<string[]>(
    []
  );
  const [savedShortLinkList, setSavedShortLinkList] = React.useState<string[]>(
    []
  );

  React.useEffect(() => {
    const savedShortLink = localStorage.getItem("shortLink");
    if (savedShortLink) {
      setSavedShortLinkList(JSON.parse(savedShortLink));
    }
    const savedLongLink = localStorage.getItem("longLink");
    if (savedLongLink) {
      setSavedLongLinkList(JSON.parse(savedLongLink));
    }
  }, []);
  return (
    <div className="flex justify-center items-center flex-col space-y-8">
      <InputBox
        savedLongLinkList={savedLongLinkList}
        setSavedLongLinkList={setSavedLongLinkList}
        savedShortLinkList={savedShortLinkList}
        setSavedShortLinkList={setSavedShortLinkList}
      />
      <div className="space-y-4">
        <LinkCard
          savedLongLinkList={savedLongLinkList}
          savedShortLinkList={savedShortLinkList}
          setSavedShortLinkList={setSavedShortLinkList}
          setSavedLongLinkList={setSavedLongLinkList}
        />
      </div>
    </div>
  );
};

export default HomePage;
