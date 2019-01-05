import { access as a, mkdir as d, writeFile as wf, constants } from 'fs';
import { promisify } from 'util';

let access = promisify(a);
let mkdir = promisify(d);
let writeFile = promisify(wf);

const { R_OK, W_OK } = constants;

export async function avatarUploader(req, res) {
    let cwd = process.cwd();

    // Create uploads folder if not exists
    try {
        await access(`${cwd}/uploads`, R_OK | W_OK);
    } catch (e) {
        if (e.code === 'ENOENT') {
            await mkdir(cwd + '/uploads');
        }
    }

    // Write avatar to disc
    let username = req.get("Username");

    try {
        await writeFile(`${cwd}/uploads/${username}_avatar.jpeg`, req.body);
    } catch (e) {
        res.status(400).send();
        return;
    }

    // console.log(req);
    res.end();
}
