export const lintArchiveFile = (file: string, inputDir: string): boolean => {

    // If file is not inside archive dir
    if(!file.includes(inputDir)) return false;

    const archiveFilePath = file.replace(inputDir + '/', '');
    const [ category, year, month, day, fileName ] = archiveFilePath.split('/');
    
    // TODO: Validate category

    // TODO: Validate year

    // TODO: Validate month

    // TODO: Validate day

    // TODO: Validate date together (year, month, day)

    // TODO: Validate fileName

    return true;
};