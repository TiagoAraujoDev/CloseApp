import { getSessionId } from "@/lib/axios/requests/authentication";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestToken = searchParams.get("request_token");

  if (requestToken) {
    const response = await getSessionId(requestToken);
    const sessionId = response?.data.session_id;

    const redirectUrl = new URL("/", request.url);

    const tokenExpiresInSeconds = 60 * 60 * 24 * 30;

    return NextResponse.redirect(redirectUrl, {
      headers: {
        "Set-Cookie": `token=${sessionId}; path=/; max-age=${tokenExpiresInSeconds}`,
      },
    });
  }
}
