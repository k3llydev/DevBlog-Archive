const fs = require('fs');
const path = require('path');
const ghpages = require('gh-pages');
const { highlight, getLanguage } = require('highlight.js');
const md = require('markdown-it')({
    html: true,
    linkify: true,
    highlight: (str, lang) => {
      if (lang && getLanguage(lang)) {
        try {
          return highlight(str, { language: lang }).value;
        } catch (error) {
            console.error('An error ocurred while highlighting\n', error);
        }
      }
      return '';
    }
});
const markdownToHTML = markdownString => md.render(markdownString);

const ARCHIVE_DIR = './archive';
const BUILD_DIR = './build';
if(!fs.existsSync(BUILD_DIR)) fs.mkdirSync(BUILD_DIR);

const markdownItems = fs.readdirSync(ARCHIVE_DIR);
const savedFiles = markdownItems.map(post => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, ARCHIVE_DIR, post);
    const htmlContent = markdownToHTML(filePath);
    fs.writeFile(`./${BUILD_DIR}/${post.replace('.md', '.html')}`, htmlContent, (error) => {
      if(error) reject(error);
      resolve(post);
    });
  });
});
Promise.all(savedFiles).then(items => {
  ghpages.publish(BUILD_DIR, {
    branch: 'archive' 
  }, (error) => {
    if(error) return console.log('An error ocurred while publishing archive.\n', error);
    console.log('Archive generated successfully');
  });
  console.log('All posts ready.');
}).catch(error => console.error('An error ocurred while generating posts build.\n', error));

