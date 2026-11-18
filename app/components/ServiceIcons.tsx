// Line icons in the site's double-ring style, for the service-page callouts.
type P = { stroke: string; size?: number };

function Ring({ children, stroke, size = 44 }: P & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22.5" />
      <circle cx="24" cy="24" r="20.5" strokeWidth="0.8" />
      {children}
    </svg>
  );
}

const PATHS: Record<string, React.ReactNode> = {
  shield: (<><path d="M24 11 L34 15 V23 C34 30 29.5 34.5 24 37 C18.5 34.5 14 30 14 23 V15 Z" /><path d="M19.5 24 L23 27.5 L29 20.5" /></>),
  tools: (<><rect x="14" y="14" width="8" height="8" rx="1.5" /><rect x="26" y="14" width="8" height="8" rx="1.5" /><rect x="14" y="26" width="8" height="8" rx="1.5" /><path d="M27 30 L29.5 32.5 L34 27" /></>),
  data: (<><ellipse cx="24" cy="16" rx="9" ry="3.5" /><path d="M15 16 V31 C15 33 19 34.5 24 34.5 C29 34.5 33 33 33 31 V16" /><path d="M15 23.5 C15 25.5 19 27 24 27 C29 27 33 25.5 33 23.5" /></>),
  lock: (<><rect x="15.5" y="22" width="17" height="13" rx="2" /><path d="M19 22 V18.5 C19 15.5 21.2 13.5 24 13.5 C26.8 13.5 29 15.5 29 18.5 V22" /><path d="M24 27 V30" /></>),
  alert: (<><path d="M24 13 L35 33 H13 Z" /><path d="M24 20.5 V26" /><path d="M24 29.5 V29.6" /></>),
  compass: (<><circle cx="24" cy="24" r="11" /><path d="M28.5 19.5 L26 26 L19.5 28.5 L22 22 Z" /></>),
  route: (<><circle cx="16" cy="32" r="2.5" /><circle cx="32" cy="16" r="2.5" /><path d="M18.5 32 H27 C30 32 31.5 30 31.5 28 C31.5 26 30 24 27 24 H21 C18 24 16.5 22 16.5 20 C16.5 18 18 16 21 16 H29.5" /></>),
  people: (<><circle cx="19" cy="19" r="4" /><circle cx="30" cy="20.5" r="3.2" /><path d="M12 33 C12 28.5 15 26 19 26 C23 26 26 28.5 26 33" /><path d="M27.5 33 C27.5 29.8 29 27.5 31.5 27.5 C34 27.5 36 29.5 36 33" /></>),
  build: (<><rect x="13" y="26" width="10" height="9" rx="1.2" /><rect x="25" y="26" width="10" height="9" rx="1.2" /><rect x="19" y="15" width="10" height="9" rx="1.2" /></>),
  spark: (<><path d="M24 12 V17" /><path d="M24 31 V36" /><path d="M12 24 H17" /><path d="M31 24 H36" /><path d="M24 18.5 C24.8 22 26 23.2 29.5 24 C26 24.8 24.8 26 24 29.5 C23.2 26 22 24.8 18.5 24 C22 23.2 23.2 22 24 18.5 Z" /></>),
};

export type IconName = keyof typeof PATHS;

export function ServiceIcon({ name, ...p }: P & { name: string }) {
  return <Ring {...p}>{PATHS[name]}</Ring>;
}
