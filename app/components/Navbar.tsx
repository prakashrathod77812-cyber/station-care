"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function loadUser() {
      const { data: claimsResponse } = await supabase.auth.getClaims();
      const claims = claimsResponse?.claims;

      if (!active) return;

      if (!claims?.sub) {
        setIsSignedIn(false);
        setIsAdmin(false);
        return;
      }

      setIsSignedIn(true);
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", claims.sub)
        .maybeSingle();

      if (active) setIsAdmin(profile?.role === "admin");
    }

    void loadUser();
    return () => {
      active = false;
    };
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.assign("/");
  }

  return (
    <nav className="flex justify-between bg-blue-700 p-4 text-white">
      <Link href="/" className="text-xl font-bold">Station Care</Link>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/report">Report</Link>
        <Link href="/volunteer">Volunteer</Link>
        <Link href="/ngo">NGO</Link>
        {isAdmin && <Link href="/dashboard">Dashboard</Link>}
        {isSignedIn ? (
          <button type="button" onClick={signOut} className="underline">Sign out</button>
        ) : (
          <>
            <Link href="/login">Sign in</Link>
            <Link href="/sign-up">Create account</Link>
          </>
        )}
      </div>
    </nav>
  );
}
