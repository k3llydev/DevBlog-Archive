import { readFileSync } from 'fs';
import { join as joinPath } from 'path';
import { extractMetadata } from '../build/extractFileMetadata';

export const lintArchiveFile = (file: string, inputDir: string): boolean => {

    // If file is not inside archive dir
    if(!file.includes(inputDir)) return false;

    const archiveFilePath = file.replace(inputDir + '/', '');
    const [ category, year, month, day, fileName ] = archiveFilePath.split('/');
    
    // TODO: Validate category

    // TODO: Validate year

    // TODO: Validate month

    // TODO: Validate day

    // TODO: Validate date together (year, month, day)

    // TODO: Validate fileName

    // TODO: Validate file content
    const content = readFileSync(file).toString('utf-8');

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
