# aviftojpg
[![Version](https://img.shields.io/npm/v/aviftojpg.svg)](https://www.npmjs.com/package/aviftojpg)
CLI to convert AVIF files to JPEG files

```sh
$ npx aviftojpg .
```

```sh
$ npx aviftojpg --help
Usage: aviftojpg <dir> [options]

CLI to convert AVIF files to JPEG files

Options:
  -o, --overwrite          overwrite AVIF file with JPEG file
  -q, --quality <quality>  JPEG quality (default: 100)
  -r, --recursive          recursive digging
  -h, --help               display help for command

$ npx aviftojpg . -r -q 80
=> ./001.jpg (quality: 80 %)
=> ./002.jpg (quality: 80 %)
=> ./003.jpg (quality: 80 %)
=> .dir1/001.jpg (quality: 80 %)
=> .dir1/dir2/001.jpg (quality: 80 %)
```