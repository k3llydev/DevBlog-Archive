import { resolve } from 'path'
import forceUnixUri from './src/steps/common/forceUnixUri';

const ASSETS_DIR = './assets/';
const INPUT_DIR = './archive/';
const OUTPUT_DIR = './build/';

const LOCAL_PATH = (relativePath: string) => forceUnixUri(resolve(relativePath));

const cfg: ConfigurationFile = {
    FORMATS: {
        DATE: 'DD MMM, YYYY'
    },
    OUTPUT: {
        STORAGE_TYPE: 'html'
    },
    DIRS: {
        ASSETS: {
            LABEL: ASSETS_DIR,
            PATH: LOCAL_PATH(ASSETS_DIR)
        },
        OUTPUT: {
            LABEL: OUTPUT_DIR,
            PATH: LOCAL_PATH(OUTPUT_DIR)
        },
        INPUT: {
            LABEL: INPUT_DIR,
            PATH: LOCAL_PATH(INPUT_DIR)
        }
    },
    HOSTS: {
        ASSETS: '/DevBlog-Archive-resources' // Always must be set to <REPO_NAME>-<BRANCH_NAME>
    },
    DEPLOYMENT: {
        ARCHIVE_BRANCH: 'archive',
        ASSETS_BRANCH: 'resources'
    }
};

export default cfg;
