import { Miniflare } from 'miniflare';
import { stichAppWorkers } from './workers-config.js';

const serverPromises = [];

for (let [workerName, workerConfig] of Object.entries(stichAppWorkers)) {
  const workerNode = new Miniflare({
    scriptPath: workerConfig.scriptPath,
    watch: true,

    // Odd hack to disable black magic in miniflare
    // https://miniflare.dev/api.html#usage
    envPath: 'empty/.env.empty',
    packagePath: 'empty/package.empty.json', // Containing empty object: {}
    wranglerConfigPath: 'empty/wrangler.empty.toml',
  });

  serverPromises.push(
    new Promise((resolve) => {
      workerNode.createServer().listen(workerConfig.localPort, () => {
        console.log(`Worker ${workerName} listening on :${workerConfig.localPort}`);
        resolve(null);
      });
    }),
  );
}

Promise.all(serverPromises).then(() => {
  console.log('\n\nAll workers started! Visit the app at http://localhost:5000/');
});
