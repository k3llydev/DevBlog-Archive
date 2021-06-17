const { rmdirSync, existsSync } = require('fs');

try {
    if (!existsSync('./post')) throw new ReferenceError('No existing post.');

    rmdirSync('./post', { recursive: true });
    console.log('Post discarded.');
} catch(error) {
    console.error('An error ocurred while attempting to archieve post.');
    console.error(error);
}