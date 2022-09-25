#!/usr/bin/env ts-node

import clean from '../steps/clean/cleanFolders';
import CONFIG from '../../config.prod';

(clean)(CONFIG.DIRS.OUTPUT.PATH);