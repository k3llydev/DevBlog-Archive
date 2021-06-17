const { writeFileSync, existsSync, mkdirSync } = require('fs');
const prompt = require('prompt-sync')({sigint: true});

try {
    if (existsSync('./post')) throw new ReferenceError('There is an already existing post.');

    const title = prompt('Post title: ');
    const url = prompt('Define a post url: (a-valid-post-url) ');

    mkdirSync('./post');
    mkdirSync('./post/images');
    writeFileSync('./post/content.md', '');
    writeFileSync('./post/config.json', JSON.stringify({title, url}, null, 4));
    console.log('Post ready to edit. You can change title and url in \'config.json\' file.');
    // })
} catch(error) {
    console.error('An error ocurred while attempting to archieve post.');
    console.error(error);
}