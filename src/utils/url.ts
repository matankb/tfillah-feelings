export function parseQueryString(query: string) {
  let q = query.startsWith('?') ? query.slice(1) : query;
  const map: { [key: string]: string } = {};
  for (const pair of q.split('&')) {
    const [key, val] = pair.split('=')
    map[key] = val;
  }
  return map;
};