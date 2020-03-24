import { Audio } from 'expo-av';

const soundObject = new Audio.Sound();

export async function checkUseAudio(arquivo) {
  Audio.setIsEnabledAsync(true);

  try {
    let status = await soundObject.getStatusAsync();

    if (status.isLoaded) {
      const uriCash = status.uri;
      await soundObject.unloadAsync();
      await soundObject.loadAsync(arquivo);
      status = await soundObject.getStatusAsync();

      if (uriCash === status.uri) {
        await soundObject.unloadAsync();

        return false;
      } else {
        return true;
      }
    } else {
      await soundObject.loadAsync(arquivo);
    }
    return true;
  } catch (e) {
    return e;
  }
}

export async function PlayAudio(arquivo, id) {
  try {
    await soundObject.playAsync();

    return true;
  } catch (e) {
    Audio.setIsEnabledAsync(false);
    return e;
  }
}

export async function watchWhenStopedAndReturnFalse() {
  let status = await soundObject.getStatusAsync();
  if (status.isLoaded)
    try {
      while (status.isPlaying) {
        status = await soundObject.getStatusAsync();
      }
      await soundObject.unloadAsync();
      return status.isPlaying;
    } catch (e) {
      return e;
    }
}
