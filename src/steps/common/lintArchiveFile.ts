import { readFileSync } from 'fs';
import { join as joinPath, dirname } from 'path';
import { extractMetadata } from '../build/extractFileMetadata';
import forceUnixUri from './forceUnixUri';

export const lintArchiveFile = (file: string): boolean => {

    const diskRoute = forceUnixUri(process.cwd());
    const inputPath = file.replace(diskRoute, '');
    console.log('INPUT PATH', inputPath);
    const [ folderName, category, year, month, day, fileName ] = inputPath.split('/');
    
    // TODO: Validate category

    // TODO: Validate year

    // TODO: Validate month

    // TODO: Validate day

    // TODO: Validate date together (year, month, day)

    // TODO: Validate fileName

    // TODO: Validate file content
    const content = readFileSync(file, { encoding: 'utf-8'});

    // Validate metadata obtained from content
    const meta = extractMetadata(content);
    const REQUIRED_PROPS = [
        'author',
        'keywords',
        'complexity',
        'category',
        'description'
    ];
    if(!REQUIRED_PROPS.every(prop => meta.hasOwnProperty(prop) && meta[prop])) throw Error('LINT ERROR - Bad metadata in ' + fileName);

    // Lint metadata specifically
    if(meta.description.length <= 250) throw Error('LINT ERROR - Description metadata must not be shorter than 250 characters in ' + fileName);

    return true;
};
