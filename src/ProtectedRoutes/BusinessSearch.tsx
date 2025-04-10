import { useState } from "react";

const BusinessSearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  return (
    <section className="mb-4">
      <input
        type="text"
        placeholder="Search businesses..."
        className="border p-2 rounded w-full"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </section>
  );
};

export default BusinessSearch;
