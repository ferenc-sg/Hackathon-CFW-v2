"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function BrandSelect({ brands, value }: { brands: { id: string; name: string }[]; value: string }) {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <select
      className="input !w-auto"
      value={value}
      onChange={(e) => {
        const next = new URLSearchParams(params.toString());
        if (e.target.value) next.set("brand", e.target.value);
        else next.delete("brand");
        router.push(`/library?${next.toString()}`);
      }}
    >
      <option value="">Baseline only</option>
      {brands.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      ))}
    </select>
  );
}
