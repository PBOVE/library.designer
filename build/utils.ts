export function wrapperEnv(envConf: Record<string, any>): Partial<ImportMetaEnv> {
  const ret: Partial<ImportMetaEnv> = {};

  Object.keys(envConf).forEach((envName) => {
    let realName = envConf[envName].replace(/\\n/g, '\n');

    try {
      realName = JSON.parse(realName);

      ret[envName] = realName;
    } catch (err) {
      //
    }
  });

  return ret;
}
