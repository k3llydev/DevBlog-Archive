export default (CONFIG: ConfigurationFile, archive: RawArchiveFile[]) => {
    const sanitizedArchive: ArchiveFile[] = [];
    for(let i = 0; i < archive.length; i++) {
        const { title, author, tags, complexity, category, hash, date, last_modified, description } = archive[i];
        sanitizedArchive.push({
            title,
            author,
            date,
            last_modified,
            tags,
            description,
            hash,
            complexity,
            category,
            storedAs: CONFIG.OUTPUT.STORAGE_TYPE
        });
    }
    return sanitizedArchive;
};
