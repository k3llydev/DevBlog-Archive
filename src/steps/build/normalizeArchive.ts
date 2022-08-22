export default (CONFIG: ConfigurationFile, archive: RawArchiveFile[]) => {
    const sanitizedArchive: ArchiveFile[] = [];
    for(let i = 0; i < archive.length; i++) {
        const { title, author, tags, complexity, category, hash, date, last_modified } = archive[i];
        sanitizedArchive.push({
            title,
            author,
            date,
            last_modified,
            tags,
            hash,
            complexity,
            category,
            storedAs: CONFIG.OUTPUT.STORAGE_TYPE
        });
    }
    return sanitizedArchive;
};
