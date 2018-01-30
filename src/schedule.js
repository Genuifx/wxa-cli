import path from 'path';
/**
 * todo:
 *  1. full control compile task
 */

class Schedule {
    constructor() {
        this.queue = [];
        this.finishedQueue = [];
    }

    push(opath) {
        let p = opath.dir+path.sep+opath.base;
        this.queue.push(p);
    }

    pop(opath) {
        let p = opath.dir+path.sep+opath.base;
        let idx = this.queue.indexOf(p);
        if (idx !== -1) {
            this.queue.splice(idx, 1);
            this.finishedQueue.push(p);
        }
    }

    clear(opath) {
        let p = opath.dir+path.sep+opath.base;
        this.queue.splice(this.queue.indexOf(p), 1);
        this.finishedQueue.splice(this.finishedQueue.indexOf(p), 1);
    }

    check(opath) {
        let p = opath.dir+path.sep+opath.base;

        return this.queue.indexOf(p) === -1 && this.finishedQueue.indexOf(p) === -1;
    }
}
const schedule = new Schedule();

export default schedule;
