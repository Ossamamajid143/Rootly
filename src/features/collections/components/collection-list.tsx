import Link from "next/link";

import type { Collection } from "@/types/collection";

export function CollectionList({
  collections,
}: {
  collections: Collection[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {collections.map((collection, index) => (
        <Link
          className={`min-h-72 rounded-[2rem] p-8 transition-transform hover:-translate-y-1 ${
            index % 2 === 0
              ? "bg-[#c8b994] text-[#253426]"
              : "bg-[#536654] text-white"
          }`}
          href={`/collections/${collection.handle}`}
          key={collection.handle}
        >
          <p className="text-xs font-semibold tracking-[0.14em] uppercase opacity-65">
            Collection {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-24 font-serif text-4xl">{collection.title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 opacity-70">
            {collection.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
