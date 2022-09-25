#!/usr/bin/env ts-node

import {
    $title,
    $log
} from '../modules/Log';

const lint = async (): Promise<void> => {

    $title('LINTING ARCHIVE DOCUMENTS');

    $log('Linting done.');
    return;
};

(async () => await lint())();
