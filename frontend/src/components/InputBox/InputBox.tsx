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

const InputBox = () => {
  const [longURL, setLongURL] = React.useState("");
  const [customURL, setCustomURL] = React.useState("");

  const shortLink = async () => {
    try {
      const url = "http://localhost:3000/api/v1/";
      const response = await axios.post(url, {
        URL: longURL,
        CustomShort: customURL,
      });

      if (response.data.success === true) {
        console.log("Response:", response.data);
      } else {
        console.error("Erddd");
      }
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Shorten Links</CardTitle>
        <CardDescription>Simplest URL shortner in the market</CardDescription>
      </CardHeader>
      <CardContent>
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
                placeholder="Enter your custom Link"
                value={customURL}
                onChange={(e) => setCustomURL(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="">
        <Button onClick={shortLink}>Short it</Button>
      </CardFooter>
    </Card>
  );
};

export default InputBox;
