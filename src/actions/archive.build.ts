#!/usr/bin/env ts-node

import { mkdirSync, writeFileSync } from 'fs';
import { join as joinPath } from 'path';
import CONFIG from '../../config.prod';
import {
    $title,
    $log
} from '../modules/Log';
import readLocalArchive from '../steps/build/readArchiveDir';
import { buildLocalArchiveData } from '../steps/build/buildLocalArchiveData';
import buildArchiveFiles from '../steps/build/buildArchiveFiles';
import normalizeArchive from '../steps/build/normalizeArchive';

import clean from '../steps/clean/cleanFolders';;

const build = async (): Promise<void> => {

    $title('CLEANING PHASE');
    clean(CONFIG.DIRS.OUTPUT.PATH);
    mkdirSync(CONFIG.DIRS.OUTPUT.PATH);

    console.log();
    $title('BUILD STARTED');
    $log('Reading files from local archive...');

    const archiveFiles = await readLocalArchive(CONFIG.DIRS.INPUT.PATH);
    $log(`Obtained ${archiveFiles.length} files from archive.`);

    $log('Retrieveing metadata from archive files...');
    const localArchive = buildLocalArchiveData(archiveFiles, CONFIG);
    $log('Successfully extracted metadata...');

    $log('Building archive...');
    const archive = buildArchiveFiles(localArchive, CONFIG);
    $log('Finished archive preparations.');

    $log('Generating archive files...');
    for(let i = 0; i < archive.length; i++) {
        const archiveFile = archive[i];
        const filePath = joinPath(CONFIG.DIRS.OUTPUT.PATH, `${archiveFile.hash}.html`);
        writeFileSync(filePath, archiveFile.content);
    }
    const finalArchive = normalizeArchive(CONFIG, archive);
    writeFileSync(joinPath(CONFIG.DIRS.OUTPUT.PATH, 'index.json'), JSON.stringify(finalArchive, null, 2));
    return $log('Archive has been successfully built.');

};

(async () => await build())();