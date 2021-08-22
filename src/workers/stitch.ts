import { appendStream, appendText } from '../stitch-utils';
import { stichAppWorkers } from '../workers-config';

addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event.request).catch((err) => new Response(err.stack, { status: 500 })),
  );
});

const htmlPreable = `
      <html>
        <head>
          <title>Stitched TODOs</title>
          <link rel="stylesheet" href="https://todomvc.com/examples/angularjs/node_modules/todomvc-common/base.css">
          <link rel="stylesheet" href="https://todomvc.com/examples/angularjs/node_modules/todomvc-app-css/index.css">
          <link rel="icon" href="data:;base64,iVBORw0KGgo=">
        </head>
        <body>
          <section class="todoapp">`;

const htmlEpilogue = `
        </body>
      </html>`;

async function handleRequest(request: Request): Promise<Response> {
  const { header, 'todo-list': todoList, footer } = stichAppWorkers;

  const headerFragment = fetch(header.endpointUrl).then((response) => response.body);
  const todoListFragment = fetch(todoList.endpointUrl).then((response) => response.body);
  const footerFragment = fetch(footer.endpointUrl).then((response) => response.body);

  const stitch = new TransformStream();
  let stitchWriter = stitch.writable.getWriter();

  (async () => {
    appendText(stitchWriter, htmlPreable);
    await appendStream(stitchWriter, headerFragment);
    await appendStream(stitchWriter, todoListFragment);
    appendText(stitchWriter, `</section>`);
    await appendStream(stitchWriter, footerFragment);
    appendText(stitchWriter, htmlEpilogue);
    stitchWriter.close();
  })();

  return new Response(stitch.readable, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}
