import { PrayerData, SourceSheet } from "../types/types";

// TODO: is parse title needed?
function parseTitle(title: string) {
  return title.split('(**')[0].trim();
}

function parseSection(ref: string) {
  const parts = ref.split(', ');
  return `${parts[2]} ${parts[3]}`
}

export async function getPrayerData(ref: string): Promise<PrayerData> {
  const data = await fetch(`https://www.sefaria.org/api/texts/${ref}`).then(r => r.json());
  console.log(data, ref);
  
  return {
    english: data.text || '',
    hebrew: data.he || '',
    name: parseTitle(data.titleVariants[0]),
    section: parseSection(data.ref),
    ref: data.ref,
    nextRef: data.next,
    prevRef: data.prev,
  }
}

export async function getSourceSheet(id: string) {
  const response = await fetch(`https://www.sefaria.org/api/sheets/${id}`);
  const data = await response.json();
  return data as SourceSheet;
}