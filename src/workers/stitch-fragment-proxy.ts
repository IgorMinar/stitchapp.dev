import { stichAppWorkers } from '../workers-config';

addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event.request).catch((err) => new Response(err.stack, { status: 500 })),
  );
});

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  const fragmentName = pathname.split('/').pop();

  if (!fragmentName) {
    throw new Error('Fragment name not specified!');
  }

  if (!(fragmentName in stichAppWorkers)) {
    throw new Error(`Unknown fragment: ${fragmentName}`);
  }

  // TODO: we need to be able to switch between local and edge route/endpoint url
  return fetch(stichAppWorkers[fragmentName].localEndpointUrl);
}
