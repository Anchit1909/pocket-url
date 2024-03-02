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

export default function LinkCard() {
  return (
    <Card className="w-[450px]">
      <CardFooter className="flex flex-col items-start justify-center py-2">
        <p className="text-blue-700 font-semibold">dub.sh/anchit</p>
        <div className="flex flex-row space-x-3">
          <p className="font-regular">Jan 25</p>
          <span>•</span>
          <p className="font-medium">https://linktr.ee/anchitsinha</p>
        </div>
      </CardFooter>
    </Card>
  );
}
