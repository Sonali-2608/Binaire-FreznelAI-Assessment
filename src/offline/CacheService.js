export class CacheService {
  static KEY = "cached_models";

  /** @param {import("../types/Model").Model[]} models */
  static save(models) {
    try {
      localStorage.setItem(CacheService.KEY, JSON.stringify(models));
      return true;
    } catch {
      return false;
    }
  }

  /** @returns {import("../types/Model").Model[] | null} */
  static load() {
    try {
      const raw = localStorage.getItem(CacheService.KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
}
