import {readFile} from 'node:fs/promises';
import {URL} from 'node:url';

export async function readJSON<T>(path: string) {
  return JSON.parse(
    await readFile(new URL(path, import.meta.url), 'utf-8')
  ) as Promise<T>;
}
