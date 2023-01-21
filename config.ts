import { readFileSync  } from 'fs';

const CONFIG = JSON.parse(
    readFileSync('./baseConfig.json', { encoding: 'utf-8' })
);

// Change to true to generate demo articles
const isDev = false;
if(isDev) {
    CONFIG.MODE = 'development';
    CONFIG.HOSTS.ASSETS = 'DevBlog-Archive-resources-dev';
    CONFIG.DEPLOYMENT.ARCHIVE_BRANCH = 'archive-dev';
    CONFIG.DEPLOYMENT.ASSETS_BRANCH = 'resources-dev';
    CONFIG.MOCK_DOCUMENTS_AMOUNT = 100; // Amount of demo articles generated
}

export default CONFIG;
