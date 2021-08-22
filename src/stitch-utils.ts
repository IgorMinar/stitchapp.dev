const encoder = new TextEncoder();
const decoder = new TextDecoder();

export async function appendStream(
  writer: WritableStreamDefaultWriter,
  readableStreamPromise: Promise<ReadableStream<Uint8Array> | null>,
) {
  const readableStream = await readableStreamPromise;
  if (!readableStream) return;

  const reader = readableStream.getReader();

  await reader.read().then(function processChunk({ done, value }): Promise<undefined> | undefined {
    if (done) {
      return;
    }

    writer.write(value);

    return reader.read().then(processChunk);
  });
}

export function appendText(writer: WritableStreamDefaultWriter, text: string) {
  writer.write(encoder.encode(text));
}
