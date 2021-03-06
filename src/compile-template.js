import {getDistPath, writeFile, readFile, info, error} from './utils';
import {amazingCache} from './utils';
import compilerLoader from './loader';
import path from 'path';
import logger from './helpers/logger';

export default class CTemplate {
    constructor(src, dist, ext, options) {
        this.current = process.cwd();
        this.src = src;
        this.dist = dist;
        this.ext = ext;
        this.options = options || {};
    }
    compile(rst, opath) {
        if (typeof rst === 'string') {
            let filepath = path.join(opath.dir, opath.base);
            rst = {
                type: rst,
                src: filepath,
                code: readFile(filepath) || '',
            };
        }

        let compiler = compilerLoader.get(rst.type);
        return amazingCache({
            source: rst.code,
            options: {configs: {}},
            transform: function(source, options) {
                return compiler.parse(source, options);
            },
        }, this.options.cache).then((succ)=>{
            let target = getDistPath(path.parse(rst.src), 'wxml', this.src, this.dist);
            logger.info('write', path.relative(this.current, target));
            writeFile(target, rst.code);
            return Promise.resolve();
        }).catch((e)=>logger.error('Error In: '+path.join(opath.dir, opath.base), e));
    }
}
