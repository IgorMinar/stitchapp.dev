# Stitched App Demo

Very basic demo of the distributed worker / microfrontend architecture.

The UI is composed as a collaboration of several workers:

```
stitch.ts (composite node)
|-> stitch-header.ts
|   |-> stitch-todo-add.ts
|-> stitch-todo-list.ts
|-> stitch-footer.ts
```

All fragments are rendered in parallel and the response is streamed to the client (via chunked encoding) as individual fragments render.

There is currently no hydration or client-side JavaScript.

The odd looking proxy exists to work around the current limitation of Cloudflare which otherwise doesn't allow workers to make request to other workers, unless the other workers run on a different domain.
[More info](https://community.cloudflare.com/t/issue-with-worker-to-worker-https-request/94472/8)


## Getting started

```
npm install
npm run start
```