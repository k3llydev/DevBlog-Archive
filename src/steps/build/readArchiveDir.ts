import { resolve, sep, posix } from 'path';
import { readdirSync } from 'fs';
import forceUnixUri from '../common/forceUnixUri';

function getFiles(dir: string) {
    const staticDir = forceUnixUri(resolve(dir));
    const dirents = readdirSync(staticDir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
        const res = resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    });
    return Array.prototype.concat(...files).map(forceUnixUri); // verify if this workis normally for other OS
}

export default getFiles;