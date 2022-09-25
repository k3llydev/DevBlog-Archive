const MARKDOWN_TITLE_REGEX = /\n# (.*)/;

export const extractTitle = (fullContent: string) => {
    const result = fullContent.match(MARKDOWN_TITLE_REGEX);
    const isResultValid = result && result.length > 0 && result[0].includes('#');
    if(!isResultValid) throw new Error(`An error ocurred while fetching title. Please verify syntax and that there's only one level 1 title.`);
    return result[1];
};