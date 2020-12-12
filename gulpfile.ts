import { GFile, Task, TSC } from 'gyi';
import { join } from 'path';

@GFile
export class GulpFile {

    @Task({
        src: join(__dirname, 'src/**/*.ts'),
        dest: join(__dirname, 'dist'),
        description: 'build 任务 ...',
    })
    public async build(tsc: TSC) {
        console.log('build');
        tsc.runtime();
    }
}