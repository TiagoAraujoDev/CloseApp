"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CiLogin, CiLogout } from "react-icons/ci";
import Cookies from "js-cookie";

import {
  getRequestToken,
  deleteSessionId,
} from "@/lib/axios/requests/authentication";

export const SessionButton = () => {
  const token = Cookies.get("token");
  const [sessionId, setSessionId] = useState<string | undefined>();
  const router = useRouter();
  
  useEffect(() => {
    setSessionId(token);
  }, [setSessionId, token]);

  const redirectUrl =
    process.env.NODE_ENV === "production"
      ? "https://close-app.vercel.app/api/callback"
      : "http://localhost:3000/api/callback";

  const handleLogin = async () => {
    const requestToken = await getRequestToken();
    router.push(
      `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectUrl}`,
    );
  };

  const handleLogout = async () => {
    if (sessionId) {
      await deleteSessionId(sessionId);
      Cookies.remove("token");
      setSessionId(undefined);
      router.push("/");
    }
  };

  return (
    <>
      {sessionId ? (
        <button
          title="Logout"
          className="disabled:cursor-not-allowed"
          onClick={handleLogout}
        >
          <CiLogout className="text-2xl text-emerald-500" />
        </button>
      ) : (
        <button
          title="Login"
          className="disabled:cursor-not-allowed"
          onClick={handleLogin}
        >
          <CiLogin className="text-2xl text-emerald-500" />
        </button>
      )}
    </>
  );
};
