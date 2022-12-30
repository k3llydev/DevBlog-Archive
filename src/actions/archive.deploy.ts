#!/usr/bin/env ts-node

import { existsSync } from 'fs';
import { publish } from 'gh-pages';
import { join } from 'path';
import CONFIG from '../../config';
import {
    $title,
    $log
} from '../modules/Log';

const deploy = async (): Promise<void> => {

    $title('DEPLOYMENT STARTED');

    const buildFolderPath = join(process.cwd(), CONFIG.DIRS.OUTPUT.PATH);
    const assetsFolderPath = join(process.cwd(), CONFIG.DIRS.ASSETS.PATH);
    if(!existsSync(buildFolderPath)) throw new Error('No build folder found. Make sure to execute a build first.');

    if(CONFIG.MODE === 'development') $log('WARNING => Deploying development build.');
    $log('Publishing output directory...');
    await Promise.all([
        new Promise((resolve, reject) => {
            publish(buildFolderPath, { branch: CONFIG.DEPLOYMENT.ARCHIVE_BRANCH }, (error) => {
                if(error) throw new Error(error);
                $log('Archive was successfully deployed!');
                resolve(1);
            });
        }),
        new Promise((resolve, reject) => {
            publish(assetsFolderPath, { branch: CONFIG.DEPLOYMENT.ASSETS_BRANCH }, (error) => {
                if(error) {
                    $log('An error ocurred while deploying assets\n' + error);
                    throw new Error(error);
                };
                $log('Assets were successfully deployed!');
                resolve(1);
            });
        })
    ]);

    $log('Succesfully deployed changes.');

};

(async () => await deploy())();