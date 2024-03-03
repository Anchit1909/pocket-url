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
      <div className="absolute w-[600px] h-[600px] bottom-[100px] bg-green-500/[6%] -z-10 rounded-full blur-3xl" />
      <div className="absolute w-[600px] h-[600px] right-[300px] bg-red-500/[6%] -z-10 rounded-full blur-3xl" />
      <div className="absolute w-[600px] h-[600px] left-[300px] bg-purple-700/[6%] -z-10 rounded-full blur-3xl" />
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
