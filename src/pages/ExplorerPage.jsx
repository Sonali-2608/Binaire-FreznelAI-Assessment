import { useEffect, useMemo, useState } from "react";
import { Flex, ProgressCircle, Text } from "@adobe/react-spectrum";
import Header from "../components/Layout/Header";
import SearchBar from "../components/Search/SearchBar";
import FilterPanel from "../components/Filters/FilterPanel";
import SortControl from "../components/Sorting/SortControl";
import ModelList from "../components/Models/ModelList";
import { ModelService } from "../models/ModelService";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { matchesSearch } from "../search/searchUtils";
import { applyFilters, getPipelineOptions, getFamilyOptions, getArchitectureOptions, getWeightOptions } from "../filters/filterUtils";
import { sortModels } from "../sorting/sortUtils";
import { emptyFilterState, SORT_KEYS } from "../types/Model";
import { logOut } from "../auth/firebase";

export default function ExplorerPage() {
  const isOnline = useOnlineStatus();

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fromCache, setFromCache] = useState(false);

  const [nameQuery, setNameQuery] = useState("");
  const [familyQuery, setFamilyQuery] = useState("");
  const debouncedName = useDebouncedValue(nameQuery, 300);
  const debouncedFamily = useDebouncedValue(familyQuery, 300);

  const [filters, setFilters] = useState(emptyFilterState);
  const [sortKey, setSortKey] = useState(SORT_KEYS.NAME_ASC);

  useEffect(() => {
    setLoading(true);
    setError("");
    ModelService.loadModels(
      (data, meta) => {
        setModels(data);
        setFromCache(meta.fromCache);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, [isOnline]);

  const options = useMemo(
    () => ({
      pipelines: getPipelineOptions(models),
      families: getFamilyOptions(models),
      architectures: getArchitectureOptions(models),
      weights: getWeightOptions(models),
    }),
    [models]
  );

  const visibleModels = useMemo(() => {
    const searched = models.filter((m) => matchesSearch(m, debouncedName, debouncedFamily));
    const filtered = applyFilters(searched, filters);
    return sortModels(filtered, sortKey);
  }, [models, debouncedName, debouncedFamily, filters, sortKey]);

  return (
    <div className="fade-in">
      <Header isOnline={isOnline} onLogout={logOut} />

      {!isOnline && (
        <Text marginBottom="size-200">
          You're offline — showing cached results{fromCache ? "" : " once available"}.
        </Text>
      )}
      {isOnline && fromCache && !loading && (
        <Text marginBottom="size-200">Showing cached results (last fetch didn't return fresh data).</Text>
      )}
      {error && <Text marginBottom="size-200">{error}</Text>}

      <SearchBar
        nameQuery={nameQuery}
        familyQuery={familyQuery}
        onNameChange={setNameQuery}
        onFamilyChange={setFamilyQuery}
      />
      <FilterPanel filters={filters} options={options} onChange={setFilters} />
      <SortControl sortKey={sortKey} onChange={setSortKey} />

      {loading ? (
        <Flex justifyContent="center" marginTop="size-400">
          <ProgressCircle isIndeterminate aria-label="Loading models" />
        </Flex>
      ) : (
        <ModelList models={visibleModels} />
      )}
    </div>
  );
}
