export default (content: string, title: string, assetsDir: string, targetDir: string) => {

    // Remove title from MD
    content = content.replace(`# ${title}`, '');

    // Remove relative route on images
    const assetsPath = assetsDir.replace('.', '');
    content = content.replaceAll(assetsPath, targetDir);

    return content;

};
