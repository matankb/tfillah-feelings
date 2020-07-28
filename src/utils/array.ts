// TODO: use this everywhere
export function toggleArrayItem<T>(array: T[], item: T) {
  const newArray = [...array];
  if (array.includes(item)) {
    newArray.splice(newArray.indexOf(item), 1);
  } else {
    newArray.push(item);
  }
  return newArray;
}