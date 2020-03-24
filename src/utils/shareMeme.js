import * as Sharing from 'expo-sharing';

import AssetUtils from 'expo-asset-utils';
import { Asset } from 'expo-asset';

async function shareMeme(meme, name) {
  const URI = await AssetUtils.copyAssetToSameDirectoryWithNewNameAsync(
    meme,
    `${name.replace(/[^\w\-]+/g, '')}.mp3`
  );

  if (!(await Sharing.isAvailableAsync())) {
    alert(`Uh oh, sharing isn't available on your platform`);
    return;
  }

  Sharing.shareAsync(URI);
}

export default shareMeme;
