interface CategoryDetail {
    id: number;
    label: string;
    abbreviated: string;
}

interface ComplexityDetail {
    id: number;
    label: string;
}

interface ArchiveFile {
    title: string;
    author: string;
    date: string;
    last_modified: string;
    hash: string;
    storedAs: 'html' | 'pdf';
    tags: string[];
    complexity: ComplexityDetail;
    category: CategoryDetail;
}

interface RawArchiveFile {
    title: string;
    author: string;
    date: string;
    hash: string;
    last_modified: string;
    tags: Array<string>
    complexity: ComplexityDetail;
    category: CategoryDetail;
    content: string;
}

interface RawPostMetadata {
    author: string;
    complexity: number;
    keywords: Array<string>;
    last_modified: string;
}

interface PostMetadata {
    author: string;
    complexity: ComplexityDetail;
    keywords: Array<string>;
    category: CategoryDetail;
    last_modified: string;
}






/**
 * CONFIGURATION
 */

interface ConfigurationFormats {
    DATE: string;
}

interface ConfigurationOutput {
    STORAGE_TYPE: 'html' | 'pdf';
}

interface ConfigurationDirectoryProperties {
    LABEL: string;
    PATH: string;
}

interface ConfigurationDirectory {
    ASSETS: ConfigurationDirectoryProperties;
    OUTPUT: ConfigurationDirectoryProperties;
    INPUT: ConfigurationDirectoryProperties;
}

interface ConfigurationHosts {
    ASSETS: string;
}

interface ConfigurationDeployment {
    ARCHIVE_BRANCH: string;
    ASSETS_BRANCH: string;
}

interface ConfigurationFile {
    FORMATS: ConfigurationFormats;
    OUTPUT: ConfigurationOutput;
    DIRS: ConfigurationDirectory;
    HOSTS: ConfigurationHosts;
    DEPLOYMENT: ConfigurationDeployment;
}