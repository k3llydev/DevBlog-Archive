const CONFIG = require('./config.json');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const MinifyHTML = require('html-minifier').minify;
const ghpages = require('gh-pages');
const { marked } = require('marked');
const { highlight, getLanguage } = require('highlight.js');

const customRenderer = new marked.Renderer();
customRenderer.code = (code, lang) => {
  const language = getLanguage(lang) ? lang : 'plaintext';
  const highlightedCode = highlight(code, { language }).value;
  const encodedCode = encodeURI(highlightedCode);
  return `
    <code class="hljs language-${language}">
      ${encodedCode}
    </code>
  `;
};

marked.setOptions({
  baseUrl: CONFIG.ASSETS_HOST,
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
const markdownToHTML = markdown => {
  let output = marked.parse(markdown);
  output = MinifyHTML(output.trim(), {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true
  });
  return output;
};

const ASSETS_DIR = './assets';
const ARCHIVE_DIR = './archive';
const BUILD_DIR = './build';
if(!fs.existsSync(BUILD_DIR)) fs.mkdirSync(BUILD_DIR);

const parseConfigComment = (config, fullContent) => {
  const segments = config.split('\n');
  segments.pop();
  segments.shift();
  const configuration = segments.reduce((acc, segmentString) => {
    const [key, value] = segmentString.split('=');
    acc[key.toLowerCase().trim()] = key.trim() === 'KEYWORDS' ? value.trim().split(',') : value.trim();
    return acc;
  }, {});

  // Extract title
  configuration.title = /# (.*)/gm.exec(fullContent)[1];

  // Remove title from MD
  fullContent = fullContent.replace(`# ${configuration.title}`, '');

  // Remove config string from MD
  fullContent = fullContent.replace(config, '');

  // Remove relative route on images
  fullContent = fullContent.replaceAll(`.${ASSETS_DIR}/`, '');

  return {
    config: configuration,
    content: fullContent
  };
};

const substrConfig = contents => {
  const commentClosingIndex = contents.indexOf('-->') + 3;
  const configString = contents.substr(0, commentClosingIndex);
  const parsedData = parseConfigComment(configString, contents);
  return parsedData;
};

const markdownItems = fs.readdirSync(ARCHIVE_DIR);
const savedFiles = markdownItems.map(post => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, ARCHIVE_DIR, post);

    const [postDate, postHash] = post.split('.');

    const expectedFinalFile = post.replace('.md', '.html');
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
    const fileData = substrConfig(fileContent);
    fileData.config.file = expectedFinalFile;
    fileData.config.hash = postHash;
    fileData.config.date = moment(postDate).format('DD MMM, YYYY');
    const htmlContent = markdownToHTML(fileData.content);
    fs.writeFile(`./${BUILD_DIR}/${expectedFinalFile}`, htmlContent, (error) => {
      if(error) reject(error);
      resolve(fileData.config);
    });
  });
});
Promise.all(savedFiles).then(items => {
  fs.writeFile(`./${BUILD_DIR}/index.json`, JSON.stringify(items), err => {
    if(err) return console.error('Error generating index file.\n', err);

    ghpages.publish(BUILD_DIR, {
      branch: 'archive' 
    }, (error) => {
      if(error) return console.log('An error ocurred while publishing archive.\n', error);
      console.log('Archive generated successfully');
      ghpages.publish(ASSETS_DIR, {
        branch: 'resources' 
      }, (error) => {
        if(error) return console.log('An error ocurred while publishing assets.\n', error);
        console.log('Assets uploaded successfully');
      });
    });

  });
}).catch(error => console.error('An error ocurred while generating posts build.\n', error));

