export function filterCountries(allCountries: [], searchKeys: string[], query: string) {

  function findMatchingKeyValuePair(object: {}): boolean {
    for (const [key, value] of Object.entries(object)) {
      if (typeof value === 'object' && !!value) {
        if (findMatchingKeyValuePair(value)) return true;
      }

      const keyMatch = searchKeys.includes(key);
      const valueMatch = String(value).toLowerCase().includes(query.toLowerCase());

      if (keyMatch && valueMatch) return true;
    }
    return false;
  }
  
  return allCountries.filter((country) => findMatchingKeyValuePair(country));
}
