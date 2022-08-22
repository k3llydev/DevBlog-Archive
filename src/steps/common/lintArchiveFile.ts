export const lintArchiveFile = (file: string, inputDir: string): boolean => {

    // If file is not inside archive dir
    if(!file.includes(inputDir)) return false;

    const archiveFilePath = file.replace(inputDir + '/', '');
    const [ category, year, month, day, fileName ] = archiveFilePath.split('/');
    
    // Validate category

    // Validate year

    // Validate month

    // Validate day

    // Validate date together (year, month, day)

    // Validate fileName

    return true;
};