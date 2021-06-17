const { readdirSync, statSync, writeFileSync } = require('fs');

const archiveDir = './archive';
const archive = [];

try {
    const postsDirs = readdirSync(archiveDir, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
    postsDirs.forEach(dir => {
        const dirFiles = readdirSync(archiveDir+'/'+dir, { withFileTypes: true });
        if(!dirFiles.length) throw new Error('A post entry does not contain \'config.json\' file. ' + dir);
        const config = require(`${archiveDir}/${dir}/config.json`);
        archive.push(config);
    });
    archive.sort((a,b) => b.timestamp - a.timestamp);
    writeFileSync('./archive/index.json', JSON.stringify({
        totalPosts: archive.length,
        archive,
    }));
    console.log('Updated \'index.json\' archive file.');
} catch(error) {
    console.error('An error ocurred while building posts file.');
    console.error(error);
}