function includesCaseInsensitive(text, query) {
  if (!query) return true;
  return text.toLowerCase().includes(query.trim().toLowerCase());
}

/**
 * @param {import("../types/Model").Model} model
 * @param {string} nameQuery
 * @param {string} familyQuery
 */
export function matchesSearch(model, nameQuery, familyQuery) {
  return (
    includesCaseInsensitive(model.display_name || "", nameQuery) &&
    includesCaseInsensitive(model.family || "", familyQuery)
  );
}
