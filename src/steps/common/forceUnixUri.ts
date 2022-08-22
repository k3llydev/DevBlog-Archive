import { sep, posix } from 'path';

export default (path: string) => path.split(sep).join(posix.sep);
