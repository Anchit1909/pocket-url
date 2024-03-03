"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, Trash2 } from "lucide-react";
import { toast, useToast } from "@/components/ui/use-toast";

export default function LinkCard() {
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

  return (
    <>
      {savedShortLinkList.length > 0 ? (
        savedShortLinkList.map((shortLink, index) => (
          <Card key={index} className="w-[450px]">
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
                <div className="flex flex-row space-x-3">
                  <p className="font-regular">Jan 25</p>
                  <span>•</span>
                  <p className="font-medium">
                    {" "}
                    {savedLongLinkList[index].substring(0, 25)}...
                  </p>
                </div>
              </div>
              <Button variant="destructive" size="sm" className="bg-red-500">
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
