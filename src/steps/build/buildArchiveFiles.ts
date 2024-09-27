import { minify } from 'html-minifier-terser';
import { marked } from 'marked';

import customRenderer from './build-steps/customRenderer';

export default async (localArchive: Array<RawArchiveFile>, CONFIG: ConfigurationFile) => {
    console.log('=============> CONFIGURING ASSETS HOST', CONFIG.HOSTS.ASSETS);
    marked.setOptions({
        baseUrl: CONFIG.HOSTS.ASSETS,
        renderer: customRenderer,
        langPrefix: 'hljs language-',
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });

    for(let i = 0; i < localArchive.length; i++) {

        // Convert to HTML
        localArchive[i].content = marked.parse(localArchive[i].content);

        // Minify generated HTML
        localArchive[i].content = await minify(localArchive[i].content.trim(), {
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        });

    }

    return localArchive;
}