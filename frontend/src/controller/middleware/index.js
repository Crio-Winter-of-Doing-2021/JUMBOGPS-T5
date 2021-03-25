import ui from './ui';
import asset from './asset';
import assets from './assets';
import user from './user';
import geo from './geo';

const flows = [
    ...ui,
    ...asset,
    ...assets,
    ...user,
    ...geo
]

export default flows;