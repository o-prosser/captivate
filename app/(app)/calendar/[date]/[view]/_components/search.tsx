"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { Input } from "@/ui/input";

const Search = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  return (
    <div className="relative">
      <SearchIcon className="ml-3 absolute h-4 w-4 mt-3 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search..."
        className="pl-10 w-full sm:w-96"
        value={search}
        onChange={(e) => {
          setSearch(e.currentTarget.value);

          router.push(
            `/calendar/${params.date}/${
              params.view
            }?search=${encodeURIComponent(e.currentTarget.value)}`,
          );
        }}
      />
    </div>
  );
};

export default Search;
