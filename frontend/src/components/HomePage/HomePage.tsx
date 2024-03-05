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
  const [savedDateList, setSavedDateList] = React.useState<string[]>([]);

  React.useEffect(() => {
    const savedShortLink = localStorage.getItem("shortLink");
    if (savedShortLink) {
      setSavedShortLinkList(JSON.parse(savedShortLink));
    }
    const savedLongLink = localStorage.getItem("longLink");
    if (savedLongLink) {
      setSavedLongLinkList(JSON.parse(savedLongLink));
    }
    const savedDate = localStorage.getItem("savedDate");
    if (savedDate) {
      setSavedDateList(JSON.parse(savedDate));
    }
  }, []);
  return (
    <div className="relative flex justify-center items-center flex-col space-y-8">
      <div className="absolute w-[600px] h-[600px] 3xl:w-[700px] 3xl:h-[700px] bottom-[50px] bg-purple-200/[30%] -z-10 rounded-full blur-3xl" />
      <div className="absolute w-[600px] h-[600px] 3xl:w-[700px] 3xl:h-[700px] left-[0px] bg-green-200/[30%] -z-10 rounded-full blur-3xl" />
      <div className="absolute w-[600px] h-[600px] 3xl:w-[700px] 3xl:h-[700px] right-[0px] bg-red-200/[30%] -z-10 rounded-full blur-3xl" />
      <InputBox
        savedLongLinkList={savedLongLinkList}
        setSavedLongLinkList={setSavedLongLinkList}
        savedShortLinkList={savedShortLinkList}
        setSavedShortLinkList={setSavedShortLinkList}
        savedDateList={savedDateList}
        setSavedDateList={setSavedDateList}
      />
      <div className="space-y-4">
        <LinkCard
          savedLongLinkList={savedLongLinkList}
          savedShortLinkList={savedShortLinkList}
          setSavedShortLinkList={setSavedShortLinkList}
          setSavedLongLinkList={setSavedLongLinkList}
          savedDateList={savedDateList}
          setSavedDateList={setSavedDateList}
        />
      </div>
    </div>
  );
};

export default HomePage;
