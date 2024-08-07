"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface props {
  savedLongLinkList: string[];
  savedShortLinkList: string[];
  savedDateList: string[];
  setSavedShortLinkList: React.Dispatch<React.SetStateAction<string[]>>;
  setSavedLongLinkList: React.Dispatch<React.SetStateAction<string[]>>;
  setSavedDateList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function LinkCard({
  savedLongLinkList,
  savedShortLinkList,
  savedDateList,
  setSavedLongLinkList,
  setSavedShortLinkList,
  setSavedDateList,
}: props) {
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

  const handleCopyShortLink = (shortLink: any) => {
    navigator.clipboard
      .writeText(shortLink)
      .then(() => {
        toast({
          title: "Copied to clipboard!",
        });
      })
      .catch((error) => {
        console.error("Failed to copy short link: ", error);
      });
  };

  const handleDeleteCard = (index: number) => {
    const updatedShortLinks = [...savedShortLinkList];
    const updatedLongLinks = [...savedLongLinkList];
    const updatedSavedDate = [...savedDateList];

    updatedShortLinks.splice(index, 1);
    updatedLongLinks.splice(index, 1);
    updatedSavedDate.splice(index, 1);

    setSavedShortLinkList(updatedShortLinks);
    setSavedLongLinkList(updatedLongLinks);
    setSavedDateList(updatedSavedDate);

    localStorage.setItem("shortLink", JSON.stringify(updatedShortLinks));
    localStorage.setItem("longLink", JSON.stringify(updatedLongLinks));
    localStorage.setItem("savedDate", JSON.stringify(updatedSavedDate));

    toast({
      title: "Link removed!",
    });
  };

  return (
    <>
      {savedShortLinkList.length > 0 ? (
        savedShortLinkList.map((shortLink, index) => (
          <Card key={index} className="w-[350px] sm:w-[500px]">
            <CardFooter className="flex justify-between items-center p-6">
              <div className="flex flex-col items-start justify-center">
                <div className="flex space-x-2 justify-center">
                  <p className="text-blue-700 font-semibold">{shortLink}</p>
                  <div className="relative">
                    <div
                      className="absolute w-6 h-6 bg-gray-200 opacity-400 rounded-full flex items-center justify-center hover:bg-gray-100"
                      onClick={() => handleCopyShortLink(shortLink)}
                    >
                      <Copy className="w-3 h-3" color="#374151" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row space-x-0 sm:space-x-3">
                  <p className="font-regular hidden sm:inline">
                    {savedDateList[index]}
                  </p>
                  <span className="hidden sm:inline">•</span>
                  <p className="font-medium">
                    {" "}
                    {savedLongLinkList[index].substring(0, 25)}...
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="bg-red-500"
                onClick={() => handleDeleteCard(index)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-gray-500 text-center">No recent links</div>
      )}
    </>
  );
}
