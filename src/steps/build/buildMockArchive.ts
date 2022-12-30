import { Categories, Labels } from '../../Dictionary';
import * as moment from 'moment';

const pickRandom = (FROM) => FROM[Math.floor(Math.random() * FROM.length)];

const POSSIBLE_TAGS = Array.from(Array(10), (_, i) => i+1);
console.log('POOSSIBLETAGS', POSSIBLE_TAGS)

export const buildMockArchive = (CONFIG) => {
    const BASE_HTML = '<h2>Demostration only article</h2>';
    const ARR_CAT = Object.values(Categories);
    const ARR_LBL = Object.values(Labels);

    const posts: Array<any> = [];

    for(let i = 0; i < CONFIG.MOCK_DOCUMENTS_AMOUNT; i++) {
        const todayDate = moment();
        const postDate = todayDate.subtract(i, 'days');
        const tagsAmount = pickRandom(POSSIBLE_TAGS);
        const tags: Array<any> = [];
        for(let i = 0; i < tagsAmount; i++) {
            tags.push(pickRandom(ARR_LBL));
        }
        const uniqueTags = tags.filter(( value, index ) => {
            const tagIndex = tags.findIndex(sTag => sTag.id === value.id);
            return tagIndex === index;
        });
        const post = {
            "title": `A demo article number ${i + 1}`,
            "author": "Kelly",
            "date": postDate.format(CONFIG.FORMATS.DATE),
            "last_modified": "",
            tags: uniqueTags,
            "description": "",
            hash: `demo-article-number-${i + 1}`,
            "complexity": {
              "id": 3,
              "label": "Advanced"
            },
            category: pickRandom(ARR_CAT),
            content: BASE_HTML,
            "storedAs": "html"
          };
          posts.push(post);
    }
    return posts;
}