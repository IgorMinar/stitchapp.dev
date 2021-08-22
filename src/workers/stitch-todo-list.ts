addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequestx(event.request).catch((err) => new Response(err.stack, { status: 500 })),
  );
});

async function handleRequestx(request: Request): Promise<Response> {
  return new Response(`<!--- todo-list @ ${new Date().toUTCString()} -->
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li>
            <div class="view">
              <input class="toggle" type="checkbox">
              <label>Cut the page into fragments</label>
              <button class="destroy"></button>
            </div>
          </li>
          <li>
            <div class="view">
              <input class="toggle" type="checkbox">
              <label>Render fragments in parallel via V8 isolates</label>
              <button class="destroy"></button>
            </div>
          </li>
          <li>
            <div class="view">
              <input class="toggle" type="checkbox">
              <label>Stitch fragment responses together</label>
              <button class="destroy"></button>
            </div>
          </li>
          <li>
            <div class="view">
              <input class="toggle" type="checkbox">
              <label>Stream the aggregated response</label>
              <button class="destroy"></button>
            </div>
          </li>
        </ul>
      </section>
      <footer class="footer" ng-show="todos.length" ng-cloak>
        <span class="todo-count"><strong>3</strong> items left</span>
        <ul class="filters">
          <li>
            <a class="selected" href="#/">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        <button class="clear-completed">Clear completed</button>
      </footer>
    `);
}
