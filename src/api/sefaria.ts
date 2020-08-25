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

interface SefariaIndexNode {
  title: string;
  nodes?: SefariaIndexNode[];
}

function getAllNodeRefs(root: SefariaIndexNode): string[] {
  if (!root.nodes) {
    return [root.title];
  }
  const nodes = [];
  for (const n of root.nodes) {
    nodes.push(...getAllNodeRefs(n).map(node => root.title + ', ' + node));
  }
  return nodes;
}

// returns array of all sefaria refs in that start with `start`
export async function getSefariaRefIndex(start: string) {
  const endpoint = `https://www.sefaria.org/api/index/${start}`;
  const data = await fetch(endpoint).then(r => r.json());
  const rootNode: SefariaIndexNode = data.schema;
  const refs = getAllNodeRefs(rootNode);
  const refPrefix = start.split(', ').slice(0, -1).join(', ');
  return refs.map(ref => `${refPrefix}, ${ref}`);
}