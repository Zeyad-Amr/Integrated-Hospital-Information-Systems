import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">
          Hello, We are {""}
          <span className="text-blue-500">Team Khaleha 3la Allah</span>
        </h1>
        <h2 className="text-4xl font-bold text-center">
          Welcome to <span className="text-blue-500">our GP.</span>
        </h2>
        <Link href="/test"> Go to Test Page</Link>
      </div>
    </main>
  );
}
