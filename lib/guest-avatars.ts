/**
 * Guest portrait pool + gender inference for chat bubbles.
 * Avatars are older white/grey-haired portraits, unique within a page.
 */

const FEMALE_FIRST_NAMES = new Set([
  "anna", "julia", "sandra", "petra", "sabine", "elena", "lisa", "nina",
  "maria", "marie", "sophie", "sophia", "laura", "emma", "lena", "clara",
  "sarah", "sara", "kate", "katharina", "katherine", "christina", "christine",
  "monika", "monica", "andrea", "birgit", "claudia", "diana", "eva", "franziska",
  "greta", "hannah", "hanna", "helene", "ines", "iris", "jana", "jennifer",
  "jessica", "karin", "katrin", "lea", "linda", "lucia", "magdalena", "marta",
  "melanie", "nadine", "natalie", "nicole", "olga", "paula", "rebecca", "regina",
  "renate", "silke", "stefanie", "stephanie", "susanne", "tanja", "theresa",
  "ulrike", "ursula", "vanessa", "verena", "victoria", "yvonne", "zoe",
  "amelia", "charlotte", "emily", "olivia", "isabella", "mia", "ava", "grace",
]);

/** Senior white/grey-haired headshots — female (Unsplash, face-cropped). */
export const FEMALE_AVATARS = [
  "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=96&h=96&q=80&crop=faces",
  "https://images.unsplash.com/photo-1695556746353-b45f7a329777?auto=format&fit=crop&w=96&h=96&q=80&crop=faces",
  "https://images.unsplash.com/photo-1759765468070-120cdc180be8?auto=format&fit=crop&w=96&h=96&q=80&crop=faces",
  "https://images.unsplash.com/photo-1695556746240-55d9f92faf43?auto=format&fit=crop&w=96&h=96&q=80&crop=faces",
];

/** Senior white/grey-haired headshots — male (Unsplash, face-cropped). */
export const MALE_AVATARS = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=96&h=96&q=80&crop=faces",
  "https://images.unsplash.com/photo-1444069069008-83a57aac43ac?auto=format&fit=crop&w=96&h=96&q=80&crop=faces",
  "https://images.unsplash.com/photo-1767880408294-95779329063a?auto=format&fit=crop&w=96&h=96&q=80&crop=faces",
  "https://images.unsplash.com/photo-1748723297913-81e0a3fb4f77?auto=format&fit=crop&w=96&h=96&q=80&crop=faces",
];

export type GuestGender = "female" | "male";

export function inferGuestGender(name: string): GuestGender {
  const raw = name.trim().toLowerCase();
  if (/^(frau|ms\.?|mrs\.?|miss)\b/.test(raw)) return "female";
  if (/^(herr|mr\.?|herrn)\b/.test(raw)) return "male";

  const first = raw
    .replace(/^(frau|herr|mr\.?|mrs\.?|ms\.?|miss)\s+/i, "")
    .split(/[\s-]+/)[0]
    ?.replace(/\.$/, "") ?? "";

  if (FEMALE_FIRST_NAMES.has(first)) return "female";
  return "male";
}

/**
 * Assign a portrait URL per guest. Within one list, the same image is never
 * reused. Honors existing guestAvatar when it is http(s) or a local
 * `/images/...` path; otherwise assigns a unique portrait from the gender pool.
 */
export function assignGuestAvatars<T extends { guestName: string; guestAvatar?: string }>(
  items: T[]
): T[] {
  let femaleIdx = 0;
  let maleIdx = 0;
  const used = new Set<string>();

  const takeNext = (pool: string[], idx: number): { url: string; next: number } => {
    const start = idx;
    let i = idx;
    do {
      const url = pool[i % pool.length];
      i += 1;
      if (!used.has(url)) {
        used.add(url);
        return { url, next: i };
      }
    } while (i % pool.length !== start % pool.length);
    // Exhausted pool — still return next (should not happen with ≤8 guests/gender)
    const url = pool[idx % pool.length];
    used.add(url);
    return { url, next: idx + 1 };
  };

  return (items ?? [])
    .filter((item): item is T => item != null && typeof item.guestName === "string")
    .map((item) => {
      const existing = item.guestAvatar;
      const usable =
        existing &&
        (existing.startsWith("http://") ||
          existing.startsWith("https://") ||
          existing.startsWith("/images/")) &&
        !used.has(existing);

      if (usable) {
        used.add(existing!);
        return item;
      }

      const gender = inferGuestGender(item.guestName);
      if (gender === "female") {
        const { url, next } = takeNext(FEMALE_AVATARS, femaleIdx);
        femaleIdx = next;
        return { ...item, guestAvatar: url };
      }
      const { url, next } = takeNext(MALE_AVATARS, maleIdx);
      maleIdx = next;
      return { ...item, guestAvatar: url };
    });
}
