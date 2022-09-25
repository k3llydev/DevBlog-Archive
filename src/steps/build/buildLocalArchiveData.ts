import { readFileSync } from 'fs';
import { lintArchiveFile } from '../common/lintArchiveFile';
import { MapLevel, MapCategory } from '../../Dictionary';

import { extractMetadata } from './extractFileMetadata';
import { extractTitle } from './extractFileTitle';
import parseMarkdown from './parseMarkdown';

import parseDate from '../common/parseDate';

export const buildLocalArchiveData = (files: string[], CONFIG: ConfigurationFile): RawArchiveFile[] => {

    const isEveryFileMarkdown: boolean = files.every(file => file.includes('.md'));
    if(!isEveryFileMarkdown) throw new Error(`One or more files in archive "${CONFIG.DIRS.INPUT.LABEL}" are not a markdown file.`);
    const isEveryFileNameLinted: boolean = files.every((file) => lintArchiveFile(file, CONFIG.DIRS.INPUT.PATH));
    if(!isEveryFileNameLinted) throw new Error(`One or more files inside archive ("${CONFIG.DIRS.INPUT.LABEL}") has an incorrect name syntax.`);

    const archiveFiles: RawArchiveFile[] = [];

    // Read markdown file data and metadata to build the archive
    for(let i = 0; i < files.length; i++) {
        const archiveFile = files[i];
        const fileRelativeData = archiveFile.replace(CONFIG.DIRS.INPUT.PATH + '/', '');

        // Read file contents
        const fileContent = readFileSync(archiveFile, { encoding: 'utf-8' });

        // Retrieve post information from scaffoling information
        const [ category, year, month, day, fileName ] = fileRelativeData.split('/');
        const [ hash, type ] = fileName.split('.');

        console.log(category, year, month, day, fileName, hash)

        const title = extractTitle(fileContent);
        const postMetadata = extractMetadata(fileContent);

        // Modified content ready for minification
        const minifiedContent = parseMarkdown(fileContent, title, CONFIG.DIRS.ASSETS.LABEL);

        archiveFiles.push({
            title,
            author: postMetadata.author,
            date: parseDate(`${year}-${month}-${day}`, CONFIG.FORMATS.DATE),
            last_modified: postMetadata.last_modified ? parseDate(postMetadata.last_modified, CONFIG.FORMATS.DATE) : '',
            hash,
            tags: postMetadata.keywords,
            complexity: MapLevel(postMetadata.complexity),
            category: MapCategory(category),
            content: minifiedContent
        });

    }

    return archiveFiles;
};
