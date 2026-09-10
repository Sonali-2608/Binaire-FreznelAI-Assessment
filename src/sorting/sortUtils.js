import { SORT_KEYS } from "../types/Model";
import { parseSafetensorCount } from "../filters/filterUtils";

/**
 * @param {import("../types/Model").Model[]} models
 * @param {string} sortKey
 */
export function sortModels(models, sortKey) {
  const copy = [...models];

  if (sortKey === SORT_KEYS.NAME_ASC) {
    return copy.sort((a, b) => a.display_name.localeCompare(b.display_name));
  }

  if (sortKey === SORT_KEYS.NAME_DESC) {
    return copy.sort((a, b) => b.display_name.localeCompare(a.display_name));
  }

  if (sortKey === SORT_KEYS.SAFETENSOR_COUNT) {
    return copy.sort((a, b) => {
      const countA = parseSafetensorCount(a);
      const countB = parseSafetensorCount(b);
      if (countA === null && countB === null) return 0;
      if (countA === null) return 1; // unknown counts sort last
      if (countB === null) return -1;
      return countA - countB;
    });
  }

  return copy;
}
