const sanitizeMetadata = (value: string) => {
    let result: string | Array<string> | number = value;

    const isList = value.includes(',');
    const isNumber = Number(value);

    result = result.trim();
    if(isList) {
        result = result.split(',').map(char => char.trim());
    }
    if(isNumber) {
        result = isNumber;
    }
    return result;
}

export const extractMetadata = (content: string): RawPostMetadata => {
    const endPosition = content.indexOf('-->') + 3;
    const configString = content.substr(0, endPosition);
    const lines = configString.split('\n');

    const Metadata: RawPostMetadata = {
        author: '',
        keywords: [],
        complexity: -1,
        last_modified: ''
    };
    for(let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if(line.includes('<!--') || line.includes('-->')) continue;

        const isMetadataLineValid = line.includes('=') && line.split('=').length === 2;
        if(!isMetadataLineValid) throw new Error(`Metadata in file "CONNECT METHOD PARAMS TO RECEIVE FILE" is invalid.`);

        const [ key, value ] = line.split('=');
        const metadataKey = key.trim().toLowerCase();
        const metadataValue = sanitizeMetadata(value);

        Metadata[metadataKey] = metadataValue;
    }
    
    return Metadata;
};
