import fs from 'fs';
import sharp from 'sharp';

/**
  * @param {string} avifDir
  * @param {object} options
  * @param {number} options.quality
  * @param {boolean} options.isWillOverwrite
  * @returns {void}
  * @memberof lib
  * @example
  * convertAvifFileToJpeg('/path/to/dir', {
  *  quality: 80,
  *  isWillOverwrite: false,
  * });
  */
const convertToJPEG = (file = '', { quality = 100, isWillOverwrite = false }) => {
  if (!file) return;
  const jpgFile = `${file.substring(0, file.lastIndexOf("."))}.jpg`;
  
  // Read the first 32 bytes of the file to check if it has a valid AVIF header
  const fd = fs.openSync(file, 'r');
  const buffer = Buffer.alloc(32);
  fs.readSync(fd, buffer, 0, 32, 0);
  const hasAvifHeader = buffer.slice(4, 8).toString() === 'ftyp' && buffer.slice(8, 12).toString() === 'avif';
  fs.closeSync(fd);

  if (hasAvifHeader) {
    sharp(`${file}`)
      .jpeg({ quality: quality })
      .toFile(`${jpgFile}`)
      .then(() => {
        console.log(`=> ${jpgFile} (quality: ${quality} %)`);
        if (isWillOverwrite) {
          fs.unlinkSync(`${file}`);
        }
      })
      .catch((err) => {
        console.error(`Error converting ${file} to JPEG: ${err}`);
      });
  } else {
    console.log(`Skipping ${file}: file format not supported.`);
  }
}

/**
 * convertAvifFileToJpeg
 * @param {array} files
 * @param {string} dir
 * @param {object} options
 * @param {number} options.quality
 * @param {boolean} options.isWillOverwrite
 * @returns {void}
 * @memberof lib
 * @example
 * convertAvifFileToJpeg([
 *   { name: 'file1.avif', isDirectory: false },
 *   { name: 'file2.avif', isDirectory: false },
 *   { name: 'file3.avif', isDirectory: false },
 * ], '/path/to/dir', {
 *   quality: 80,
 *   isWillOverwrite: false,
 * });
 */
const convertAvifFileToJpeg = (files = [], fileDir = '', options = {}) => {
  files
    .filter(file => !file.isDirectory() && (file.name || '').endsWith('.avif'))
    .forEach((file) => convertToJPEG(`${fileDir}/${file.name}`, options));
}

export default {
  convertToJPEG,
  convertAvifFileToJpeg,
};