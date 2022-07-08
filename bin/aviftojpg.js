#! /usr/bin/env node

import fs from 'fs';
import { program } from 'commander';
import lib from './lib.js';

program
  .name('aviftojpg')
  .usage("<dir> [options]")
  .description('CLI to convert AVIF files to JPEG files')
  .option('-o, --overwrite', 'overwrite AVIF file with JPEG file')
  .option('-q, --quality <quality>', 'JPEG quality (default: 100)')
  .option('-r, --recursive', 'recursive digging')

program.parse(process.argv);
if (program.args.length < 1) {
  program.help();
}

const opts = program.opts();
const convertOptions = {
  quality: Number(opts.quality) || 100,
  isWillOverwrite: opts.overwrite || false,
}

const diggingAVIF = (dir) => {
  fs.readdir(dir, { withFileTypes: true }, (err, files = []) => {
    lib.convertAvifFileToJpeg(files, dir, convertOptions);
    if (opts.recursive) {
      files
        .filter(file => file.isDirectory())
        .forEach(childDir => diggingAVIF(`${dir}/${childDir.name}`));
    }
  })
}

diggingAVIF(program.args[0].replace(/\/$/, ''));
