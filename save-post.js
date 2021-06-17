const { readdirSync, writeFileSync, statSync, readFileSync, existsSync, mkdirSync, renameSync, rmdirSync } = require('fs');
const moment = require('moment');

try {
    const postDir = readdirSync('./post', { withFileTypes: true });
    if(!postDir.length) throw new ReferenceError('No post detected inside directory.');
    const contentFile = postDir.find(file => file.name === 'content.md');
    if(!contentFile) throw new TypeError('No content.md file found.');
    const content = readFileSync('./post/content.md', 'utf8');
    if(!content.length) throw new TypeError('Post content file is empty.');
    const configFile = postDir.find(file => file.name === 'config.json');
    if(!configFile) throw new TypeError('No config json file found.');
    const configs = require('./post/config.json');
    
    if(!configs.title) throw new TypeError('No title provided in config file.');
    if(!configs.url) throw new TypeError('No url provided in config file.');


    if(existsSync('./archive/'+configs.url)) throw new TypeError('A post name already uses the URL: '+configs.url);

    // Create folder based on URL
    mkdirSync('./archive/'+configs.url);

    // Move images folder
    renameSync('./post/images', `./archive/${configs.url}/images`);

    // Move content.md file
    renameSync('./post/content.md', `./archive/${configs.url}/content.md`);

    const postData = {
        title: configs.title,
        url: configs.url,
        content: `/archive/${configs.url}/content.md`,
        images: `/archive/${configs.url}/images/`,
        date: moment().format('MMMM Do YYYY'),
        timestamp: moment().valueOf()
    };

    writeFileSync(`./archive/${configs.url}/config.json`, JSON.stringify(postData, null, 4));

    // Delete post folder
    rmdirSync('./post', { recursive: true });

    console.log(postData);
} catch(error) {
    console.error('An error ocurred while attempting to archieve post.');
    console.error(error);
}