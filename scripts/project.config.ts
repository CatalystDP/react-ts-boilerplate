import * as path from 'path';
const parentDir = path.resolve(__dirname, '../');
let projectConfig = {
  parentDir,
  isProduction: process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production',
  sourcePath: path.join(parentDir, 'src'),
  outPath: path.join(parentDir, './dist'),
  devServerPort: 5000
};
export default projectConfig;
