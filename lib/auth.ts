import { cookies } from "next/headers";
import { supabase } from "./supabase";
import bcrypt from "bcryptjs";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

export async function verifyCredentials(email: string, password: string) {
  const { data: user, error } = await supabase
    .from("User")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  return user;
}

export async function createSession(userId: string) {
  const sessionToken = crypto.randomUUID();
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, `${userId}:${sessionToken}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return sessionToken;
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  const [userId] = sessionCookie.value.split(":");

  if (!userId) {
    return null;
  }

  const { data: user, error } = await supabase
    .from("User")
    .select("id, email, name")
    .eq("id", userId)
    .single();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

// Utilitaire pour hasher un mot de passe (à utiliser lors de la création manuelle d'utilisateurs)
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

