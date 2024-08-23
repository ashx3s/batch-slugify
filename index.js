"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const process = require("node:process");

const input = process.argv.slice(2);

if (process.argv.length === 2) {
  console.error("enter arguments in this order: srcDir, outDir, extension");
  return;
}

const srcDir = input[0];
const outDir = input[1];
const extension = input[2];

function slugify(file, ext = "webp") {
  const newName = file.replace(/[^a-zA-Z0-9]+ (?=\.${ext}) /g, "-");
  return newName.toLowerCase();
}

async function slugifyAllFilesInDirectory(srcDir, outDir, ext) {
  const files = await fs.readdir(srcDir);

  for (const file of files) {
    const slugifiedName = slugify(file, ext);
    const oldFile = path.join(srcDir, file);
    const newFile = path.join(outDir, slugifiedName);
    await fs.copyFile(oldFile, newFile);
  }
}
slugifyAllFilesInDirectory(srcDir, outDir, extension);
