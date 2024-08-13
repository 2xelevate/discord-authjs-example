import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4 text-xl">Oops! The page you are looking for does not exist.</p>
      <Link href="/" passHref>
        <button className="mt-6 px-4 py-2 text-lg font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
          Go back home
        </button>
      </Link>
    </div>
  );
}
