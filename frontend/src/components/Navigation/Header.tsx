import { cn } from "@/lib/utils";
import { IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";

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
            <div className="flex justify-center items-center flex-row space-x-4">
                {/* <button className="group mx-auto flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black font-default dark:bg-white dark:text-black dark:hover:bg-stone-800 dark:hover:text-white">
                  <p>Hey</p>
                </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
