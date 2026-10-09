import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getServerUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${baseURL}auth/me`, {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data.user;
  } catch {
    return null;
  }
}