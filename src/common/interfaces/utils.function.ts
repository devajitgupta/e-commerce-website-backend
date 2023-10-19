import { extname } from 'path';
import { randomBytes } from 'crypto';
import { DefaultFindParams } from './utils-interface';
import { Readable } from 'stream';

export const convertToKey = (title: string): string => {
  return (
    title
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^A-Za-z0-9_]/g, '-')
      .toLowerCase() || ''
  );
};

export const generateParams = (params: any, options?: any) => {
  return {
    ...DefaultFindParams,
    ...params,
    ...options,
  };
};

const allowedExtensions = [
  '.jpg',
  '.jpeg',
  '.png',
  '.pdf',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
];

export function customFilename(req, file, callback) {
  //const randomName = randomBytes(8).toString('hex');
  const fileExtName = extname(file.originalname);
  if (allowedExtensions.includes(fileExtName.toLowerCase())) {
    callback(
      null,
      `${convertToSlug(file.originalname.split('.')[0])}${fileExtName}`,
    );
  } else {
    callback(new Error('Invalid file type'));
  }
}

export function allowedFileTypes(filename: string): boolean {
  const fileExtName = extname(filename);
  return allowedExtensions.includes(fileExtName.toLowerCase());
}

function convertToSlug(inputString) {
  // Convert the string to lowercase
  const lowerCaseString = inputString.toLowerCase();

  // Replace spaces and special characters (except '_' and '-') with '-'
  const slug = lowerCaseString.replace(/[^\w-]/g, '-');

  return slug;
}

// zip-utils.ts
