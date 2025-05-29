// scripts/generateFileSchema.ts
import { readdirSync, statSync, writeFileSync } from "fs";
import { join, relative } from "path";


export function parseDir(dir: string): string[] {
  const entries = readdirSync(dir);
  return entries.flatMap(entry => {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      return parseDir(fullPath);
    } else {
      return [relative(dir, fullPath).replace(/\\/g, "/")];
    }
  });
}

// const files = walk(publicDir); // e.g. ["images/logo.png", "docs/readme.md"]

// export const getFileNames = (dir: string) => {
  // const publicDir = join(__dirname, "../public");
  // walk(dir)
// }
// const literals = files.map(f => `z.literal("${f}")`).join(",\n  ");
// const fileSchema = `
// import { z } from "zod";

// export const FilePathSchema = z.union([
//   ${literals}
// ]);

// export type FilePath = z.infer<typeof FilePathSchema>;
// `;

// writeFileSync("src/schemas/FilePathSchema.ts", fileSchema);
// console.log("✅ FilePathSchema.ts generated");
