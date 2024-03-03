import LinkCard from "@/components/GeneratedLinks/LinkCard";
import InputBox from "@/components/InputBox/InputBox";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-screen-lg px-2.5 md:px-20 py-16">
      <div className="flex justify-center items-center flex-col space-y-8">
        <div className="text-4xl max-w-lg flex flex-col items-center justify-center font-semibold font-poppins">
          <span>The most efficient</span>
          <span className="block bg-gradient-to-r from-rose-500 to-red-500 bg-clip-text text-transparent">
            URL shortner
          </span>
        </div>
        <InputBox />
        <div className="space-y-4">
          <LinkCard />
        </div>
      </div>
    </main>
  );
}
