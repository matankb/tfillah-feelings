export interface Prayer {
  id: string;
  ref: string;
  responses: Response[];
}

// Prayer data from sefaria
export interface PrayerData {
  section: string;
  name: string;
  hebrew: string;
  english: string;
  ref: string;
  nextRef: string; // next ref
  prevRef: string;
}

export interface Response {
  age: number;
  feeling: string; // id of feeling
}

export interface Feeling {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface Template {
  id: string;
  name: string;
  refs: string[];
}

// Source sheet data from sefaria
export interface SourceSheet {
  title: string;
  includedRefs: string[];
}