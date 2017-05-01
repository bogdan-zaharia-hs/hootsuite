/**
 * Created by Raicea on 01.05.2017.
 */
import push from 'git-push';

const remote = {
    name: 'production',
    url: 'https://pixelcaps.github.io/hootsuite',
    branch: 'gh-pages'
};

export default async () => {
    await build();
    await new Promise(resolve => push('./build', remote, resolve));
};