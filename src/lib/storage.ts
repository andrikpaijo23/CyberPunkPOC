import { useEffect, useState } from "react";

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  emoji: string;
  enabled: boolean;
}

export interface Profile {
  name: string;
  bio: string;
  avatar: string;
}

const LINKS_KEY = "cyber_links";
const PROFILE_KEY = "cyber_profile";

const defaultLinks: LinkItem[] = [
  { id: "1", title: "My Portfolio", url: "https://example.com", emoji: "🌐", enabled: true },
  { id: "2", title: "Twitter / X", url: "https://twitter.com", emoji: "🐦", enabled: true },
  { id: "3", title: "GitHub", url: "https://github.com", emoji: "💻", enabled: true },
  { id: "4", title: "Discord Server", url: "https://discord.com", emoji: "🎮", enabled: true },
  { id: "5", title: "Buy me a coffee", url: "https://buymeacoffee.com", emoji: "☕", enabled: false },
];

const defaultProfile: Profile = {
  name: "NEO_RUNNER",
  bio: "// Digital architect from Night City\nCoder · Designer · Cyber-nomad",
  avatar: "",
};

export function useLinks() {
  const [links, setLinks] = useState<LinkItem[]>(() => {
    try {
      const stored = localStorage.getItem(LINKS_KEY);
      return stored ? JSON.parse(stored) : defaultLinks;
    } catch { return defaultLinks; }
  });

  useEffect(() => {
    localStorage.setItem(LINKS_KEY, JSON.stringify(links));
  }, [links]);

  return [links, setLinks] as const;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() => {
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      return stored ? JSON.parse(stored) : defaultProfile;
    } catch { return defaultProfile; }
  });

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  return [profile, setProfile] as const;
}
