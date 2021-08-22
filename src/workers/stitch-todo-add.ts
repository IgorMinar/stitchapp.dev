addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event.request).catch((err) => new Response(err.stack, { status: 500 })),
  );
});

async function handleRequest(request: Request): Promise<Response> {
  return new Response(`<!--- todo-add @ ${new Date().toUTCString()} -->
      <form class="todo-form">
          <input class="new-todo" placeholder="What needs to be done?" autofocus>
      </form>
    `);
}
