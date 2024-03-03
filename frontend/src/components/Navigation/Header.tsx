import { cn } from "@/lib/utils";
import { IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import Github from "../Icons/Github";
import TwitterIcon from "../Icons/Twitter";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

function Header() {
  return (
    <div className="sticky h-16 inset-x-0 top-0 z-30 w-full border-b backdrop-blur-lg transition-all">
      <div className="mx-auto w-full max-w-screen-lg px-2.5 md:px-20">
        <div className="md:px-10 px-2.5">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex z-40 font-semibold items-center gap-2"
            >
              <div className="text-xl space-x-1">
                <span
                  className={cn(
                    ibmPlexMono.className,
                    "tracking-tighter font-bold"
                  )}
                >
                  TinyURL
                </span>
              </div>
            </Link>
            <div className="hidden items-center space-x-4 sm:flex"></div>
            <div className="flex justify-center items-center flex-row space-x-2">
              <a
                href="https://github.com/Anchit1909/shorten-url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
              </a>
              <a
                href="https://twitter.com/anchit1909"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
