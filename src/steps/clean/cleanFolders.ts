import { existsSync, rmSync } from 'fs';
import {
    $title,
    $log
} from '../../modules/Log';

const clean = async (dir: string): Promise<void> => {
    if(existsSync(dir)) rmSync(dir, {recursive: true});
    $log('Directory cleaned.');
};

export default clean;
