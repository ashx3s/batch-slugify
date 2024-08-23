"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const process = require("node:process");

const input = process.argv.slice(2);

if (process.argv.length === 2) {
  console.error("Run command with the source directory and output directory");
  return;
}

const srcDir = input[0];
const outDir = input[1];

function slugify(file) {
  const regex = /^[a-zA-Z0-9\s]+\.[a-zA-Z0-9]+$/;
  if (!regex.test(file)) {
    throw new Error(`Error: ${file} is not a valid filename`);
  }
  const ext = path.extname(file);

  const slugified = file.replace(`/[^a-zA-Z0-9]+ (?=\.${ext}) /g, "-"`);
  return slugified.toLowerCase();
}

async function slugifyAllFilesInDirectory(srcDir, outDir) {
  try {
    const files = await fs.readdir(srcDir);

    for (const file of files) {
      const slugifiedName = slugify(file);
      const oldFile = path.join(srcDir, file);
      const newFile = path.join(outDir, slugifiedName);
      try {
        await fs.access(newFile);
        console.warn(`File already exists: ${newFile}. Skipping ...`);
      } catch (error) {
        await fs.copyFile(oldFile, newFile);
        console.log(`Copied ${oldFile} to ${newFile}`);
      }
    }
  } catch (error) {
    console.error(`Error slugifying files: ${error}`);
  }
}
slugifyAllFilesInDirectory(srcDir, outDir);
