"use client";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = debounce((key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) params.delete(key);
    else params.set(key, value);

    params.set("page", "1"); // reset pagination when filter changes

    router.replace(`?${params.toString()}`);
  }, 400); // debounce

  return { updateFilter };
}
