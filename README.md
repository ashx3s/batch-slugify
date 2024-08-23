# README

This is a simple package for batch slugifying all the files in a directory. It was written to deal with a bunch of images quickly.

It makes copies of the files instead of renaming them, so on large quantities of larger files, it might not be suitable in it's current form.

## Instructions

- Execute `npm run slugify inputDirectory outputDirectory`

## Needed Features

- [ ] Create the output directory if it doesn't exist
- [ ] Use streams for copying files for better handling of large files
