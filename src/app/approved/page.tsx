"use client";

import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthContext } from "@/context/AuthContext";

export default function SessionApprovedPage() {
  const { createSessionId } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("request_token");

  const handleLogginInSession = async (token: string | null) => {
    if (token) await createSessionId(token);
    router.push("/");
  };

  return (
    <section className="myMinHeight m-auto my-8 flex max-w-5xl items-center justify-center px-4">
      <div className="flex flex-col items-center justify-between gap-6">
        <h1 className="text-center text-4xl font-bold text-emerald-500">
          Loggin Approved
        </h1>
        <button
          className="rounded border border-emerald-500 p-3 text-2xl text-neutral-50 transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-green-800"
          onClick={() => handleLogginInSession(token)}
        >
          Start navigation
        </button>
      </div>
    </section>
  );
}
