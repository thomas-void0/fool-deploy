//  generateHash
import cpypto from 'crypto';
import { Options } from '../typings';

function generateHash(options: Options) {
  const md5 = cpypto.createHash('md5');
  const str = md5.update(JSON.stringify(options)).digest('hex');
  return str;
}

export default generateHash;
