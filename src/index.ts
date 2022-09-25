import { existsSync, rmSync, mkdirSync, writeFileSync } from 'fs';
import { join as joinPath, resolve } from 'path';
import { publish } from 'gh-pages';
import CONFIG from '../config.prod';
import {
    $title,
    $log
} from './modules/Log';
import readLocalArchive from './steps/build/readArchiveDir';
import { buildLocalArchiveData } from './steps/build/buildLocalArchiveData';
import buildArchiveFiles from './steps/build/buildArchiveFiles';
import normalizeArchive from './steps/build/normalizeArchive';

export const clean = async (dir: string): Promise<void> => {
    if(existsSync(dir)) rmSync(dir, {recursive: true});
    $log('Directory cleaned.');
};

export const build = async (): Promise<void> => {

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
    $log('Archive has been successfully built.');

};

export const deploy = async (): Promise<void> => {

    $title('DEPLOYMENT STARTED');

    if(!existsSync(CONFIG.DIRS.OUTPUT.PATH)) throw new Error('No build folder found. Make sure to execute a build first.');

    $log('Publishing output directory...');
    await Promise.all([
        new Promise((resolve, reject) => {
            publish(CONFIG.DIRS.OUTPUT.PATH, { branch: CONFIG.DEPLOYMENT.ARCHIVE_BRANCH }, (error) => {
                if(error) throw new Error(error);
                $log('Archive was successfully deployed!');
                resolve(1);
            });
        }),
        new Promise((resolve, reject) => {
            publish(CONFIG.DIRS.ASSETS.PATH, { branch: CONFIG.DEPLOYMENT.ASSETS_BRANCH }, (error) => {
                if(error) throw new Error(error);
                $log('Assets were successfully deployed!');
                resolve(1);
            });
        })
    ]);

    $log('Succesfully deployed changes.');

};

export const lint = async (): Promise<void> => {

    $log('Linting documents...');

    
};