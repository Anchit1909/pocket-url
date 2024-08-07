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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Check, Copy } from "lucide-react";
import { toast } from "../ui/use-toast";

interface props {
  savedLongLinkList: string[];
  savedShortLinkList: string[];
  savedDateList: string[];
  setSavedShortLinkList: React.Dispatch<React.SetStateAction<string[]>>;
  setSavedLongLinkList: React.Dispatch<React.SetStateAction<string[]>>;
  setSavedDateList: React.Dispatch<React.SetStateAction<string[]>>;
}

const InputBox = ({
  savedLongLinkList,
  savedShortLinkList,
  savedDateList,
  setSavedLongLinkList,
  setSavedShortLinkList,
  setSavedDateList,
}: props) => {
  const [longURL, setLongURL] = React.useState("");
  const [customURL, setCustomURL] = React.useState("");
  const [shortLink, setShortLink] = React.useState("");
  const shortenLink = async () => {
    try {
      const url = "https://pocketurlapi.anchitsinha.xyz/api/v1";
      const requestData = {
        url: longURL,
        short: customURL,
      };
      const response = await axios.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.short) {
        setShortLink(response.data.short);
        setSavedShortLinkList([...savedShortLinkList, response.data.short]);
        setSavedLongLinkList([...savedLongLinkList, longURL]);
        setSavedDateList([...savedDateList, response.data.current_date]);

        let savedShortLink = localStorage.getItem("shortLink");
        const savedLongLink = localStorage.getItem("longLink");
        const savedDate = localStorage.getItem("savedDate");
        let savedShortLinkArray;
        let savedLongLinkArray;
        let savedDateArray;
        if (savedShortLink && savedLongLink && savedDate) {
          savedShortLinkArray = JSON.parse(savedShortLink);
          localStorage.setItem(
            "shortLink",
            JSON.stringify([response.data.short, ...savedShortLinkArray])
          );
          savedLongLinkArray = JSON.parse(savedLongLink);
          localStorage.setItem(
            "longLink",
            JSON.stringify([longURL, ...savedLongLinkArray])
          );
          savedDateArray = JSON.parse(savedDate);
          localStorage.setItem(
            "savedDate",
            JSON.stringify([response.data.current_date, ...savedDateArray])
          );
        } else {
          localStorage.setItem(
            "shortLink",
            JSON.stringify([response.data.short])
          );
          localStorage.setItem("longLink", JSON.stringify([longURL]));
          localStorage.setItem(
            "savedDate",
            JSON.stringify([response.data.current_date])
          );
        }
      } else {
        toast({
          title: "Something went wrong, please try again.",
        });
      }
    } catch (error: any) {
      console.log("error", error);
      if (error.message === "Network Error") {
        toast({
          title: "Something went wrong, please try again.",
        });
      } else {
        toast({
          title: `${error.response.data.error}`,
        });
      }
    }
  };

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

  const emptyLink = () => {
    setShortLink("");
    setLongURL("");
    setCustomURL("");
  };

  return (
    <Card className="w-[350px] sm:w-[500px] relative">
      <div className="absolute w-[500px] h-[500px] 3xl:w-[700px] 3xl:h-[700px] -top-[200px] bg-purple-200/[35%] -z-10 rounded-full blur-3xl" />
      <div className="absolute w-[500px] h-[500px] 3xl:w-[700px] 3xl:h-[700px] left-[150px] -top-[50px] bg-green-200/[35%] -z-10 rounded-full blur-3xl" />
      <div className="absolute w-[500px] h-[500px] 3xl:w-[700px] 3xl:h-[700px] right-[150px] -top-[50px] bg-red-200/[35%] -z-10 rounded-full blur-3xl" />
      <CardHeader>
        <CardTitle>Shorten Links</CardTitle>
        <CardDescription>Simplest URL shortner in the market</CardDescription>
      </CardHeader>
      <CardContent
        className={`${shortLink ? "flex justify-center items-center" : ""}`}
      >
        {shortLink ? (
          <div className="space-x-2 flex flex-row">
            <Check color="#22c55e" />
            <p className="">{shortLink}</p>
            <div className="relative">
              <div
                className="absolute w-6 h-6 bg-gray-200 opacity-400 rounded-full flex items-center justify-center hover:bg-gray-100"
                onClick={() => handleCopyShortLink(shortLink)}
              >
                <Copy className="w-3 h-3" color="#374151" />
              </div>
            </div>
          </div>
        ) : (
          <form>
            <div className="grid w-full items-center gap-4 mb-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Long URL">Enter your Long URL here</Label>
                <Input
                  id="Long URL"
                  placeholder="Enter your Link here"
                  value={longURL}
                  onChange={(e) => setLongURL(e.target.value)}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Custom URL">Customize your Link</Label>
                <Input
                  id="Custom URL"
                  placeholder="Enter your custom text (optional)"
                  value={customURL}
                  onChange={(e) => setCustomURL(e.target.value)}
                />
              </div>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter
        className={`${shortLink ? "flex justify-center items-center" : ""}`}
      >
        {shortLink ? (
          <Button onClick={emptyLink}>Short another Link</Button>
        ) : (
          <Button onClick={shortenLink}>Short it</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default InputBox;
