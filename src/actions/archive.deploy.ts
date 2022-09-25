#!/usr/bin/env ts-node

import { existsSync } from 'fs';
import { publish } from 'gh-pages';
import CONFIG from '../../config.prod';
import {
    $title,
    $log
} from '../modules/Log';

const deploy = async (): Promise<void> => {

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

export default deploy;
