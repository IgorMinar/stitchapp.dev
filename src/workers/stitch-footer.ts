addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event.request).catch((err) => new Response(err.stack, { status: 500 })),
  );
});

async function handleRequest(request: Request): Promise<Response> {
  // let's add some delay to confirm that we are chunking the response
  await new Promise((resolve) => setTimeout(() => resolve(null), 1500));
  return new Response(`<!--- footer @ ${new Date().toUTCString()} -->
      <footer class="info">
        <p>Double-click to edit a todo!</p>
        <p>Credits:
          <a href="https://twitter.com/IgorMinar">Igor Minar</a>
        </p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    `);
}
