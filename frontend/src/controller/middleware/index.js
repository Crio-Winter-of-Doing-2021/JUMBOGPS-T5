import asset from './asset';
import assets from './assets';
import geo from './geo';
import ui from './ui';
import user from './user';

const flows = [
    ...ui,
    ...asset,
    ...assets,
    ...user,
    ...geo
]

export default flows;