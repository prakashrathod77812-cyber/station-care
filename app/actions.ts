"use server";

import { createClient } from "@/lib/supabase/server";

type Result = { error: string } | { success: string };

function text(formData: FormData, field: string, maxLength: number) {
  const value = formData.get(field);
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= maxLength
    ? value.trim()
    : null;
}

function wholeNumber(formData: FormData, field: string, max: number) {
  const value = text(formData, field, 3);
  if (!value || !/^\d+$/.test(value)) return null;

  const number = Number(value);
  return Number.isSafeInteger(number) && number >= 0 && number <= max ? number : null;
}

async function authenticatedClient(): Promise<
  | { error: string }
  | { supabase: Awaited<ReturnType<typeof createClient>> }
> {
  const supabase = await createClient();
  const { data: claimsResponse } = await supabase.auth.getClaims();
  const claims = claimsResponse?.claims;

  if (!claims?.sub) return { error: "Please sign in before submitting this form." };
  return { supabase };
}

export async function submitReport(formData: FormData): Promise<Result> {
  const station = text(formData, "station", 120);
  const adults = wholeNumber(formData, "adults", 100);
  const children = wholeNumber(formData, "children", 100);
  const description = text(formData, "description", 2000);

  if (!station || adults === null || children === null || !description) {
    return { error: "Provide a station, valid counts, and a description." };
  }

  const auth = await authenticatedClient();
  if ("error" in auth) return auth;
  const { error } = await auth.supabase
    .from("reports")
    .insert({ station, adults, children, description });

  if (error) return { error: "Your report could not be saved. Please try again." };
  return { success: "Report submitted successfully." };
}

export async function registerVolunteer(formData: FormData): Promise<Result> {
  const name = text(formData, "name", 120);
  const email = text(formData, "email", 254)?.toLowerCase();
  const phone = text(formData, "phone", 32);
  const city = text(formData, "city", 120);
  const reason = text(formData, "reason", 2000);

  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email) || !phone || !/^[0-9+()\-\s]{7,32}$/.test(phone) || !city || !reason) {
    return { error: "Please provide complete, valid contact details and a reason." };
  }

  const auth = await authenticatedClient();
  if ("error" in auth) return auth;
  const { error } = await auth.supabase
    .from("volunteer_applications")
    .insert({ name, email, phone, city, reason });

  if (error) return { error: "Your registration could not be saved. Please try again." };
  return { success: "Volunteer registration submitted successfully." };
}

export async function registerNgo(formData: FormData): Promise<Result> {
  const name = text(formData, "ngoName", 160);
  const contactName = text(formData, "contactPerson", 120);
  const email = text(formData, "email", 254)?.toLowerCase();
  const coverageArea = text(formData, "coverageArea", 240);

  if (!name || !contactName || !email || !/^\S+@\S+\.\S+$/.test(email) || !coverageArea) {
    return { error: "Please provide a name, contact, valid email, and coverage area." };
  }

  const auth = await authenticatedClient();
  if ("error" in auth) return auth;
  const { error } = await auth.supabase
    .from("ngo_applications")
    .insert({ name, contact_name: contactName, email, coverage_area: coverageArea });

  if (error) return { error: "Your registration could not be saved. Please try again." };
  return { success: "NGO registration submitted successfully." };
}
