import { createClient } from "./server";
import type { CustomerProfile, OnboardingDraft, AgentConfig } from "@/types/onboarding";

export async function getCustomerProfile(userId: string): Promise<CustomerProfile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("customer_profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) return null;
  return data as CustomerProfile;
}

export async function upsertCustomerProfile(
  userId: string,
  fields: Partial<Omit<CustomerProfile, "id" | "created_at" | "updated_at">>
): Promise<void> {
  const supabase = await createClient();
  await supabase.from("customer_profiles").upsert(
    { id: userId, ...fields, updated_at: new Date().toISOString() },
    { onConflict: "id" }
  );
}

export async function updateLastLogin(userId: string): Promise<void> {
  const supabase = await createClient();
  await supabase
    .from("customer_profiles")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", userId);
}

export async function getOnboardingDraft(userId: string): Promise<OnboardingDraft | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("onboarding_drafts")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) return null;
  return data as OnboardingDraft;
}

export async function saveOnboardingDraft(
  userId: string,
  fields: Partial<Omit<OnboardingDraft, "id" | "user_id" | "created_at" | "updated_at">>
): Promise<void> {
  const supabase = await createClient();
  await supabase.from("onboarding_drafts").upsert(
    { user_id: userId, ...fields, updated_at: new Date().toISOString() },
    { onConflict: "user_id" }
  );
}

export async function getAgentConfig(userId: string): Promise<AgentConfig | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("agent_configs")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) return null;
  return data as AgentConfig;
}

export async function submitAgentConfig(
  userId: string,
  config: Omit<AgentConfig, "id" | "user_id" | "status" | "submitted_at" | "activated_at" | "created_at" | "updated_at">
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("agent_configs").upsert(
    {
      user_id: userId,
      ...config,
      avv_accepted_at: config.avv_accepted ? new Date().toISOString() : null,
      status: "pending",
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
  if (error) return { error: error.message };
  return { error: null };
}
