import "server-only";

import { tryit } from "radash";
import type { Version } from "~/types/version";

export async function fetchApplicationsBenchmarksCommitHash({ version }: { version: Version }) {
  const [error, response] = await tryit(fetch)(
    `https://raw.githubusercontent.com/risc0/ghpages/${version}/dev/benchmarks/COMMIT_HASH.txt`,
    {
      next: { revalidate: 180 }, // 3 minutes cache
    },
  );

  // error handling
  if (error || !response.ok) {
    throw error || new Error("Failed to fetch");
  }

  return await response.text();
}
