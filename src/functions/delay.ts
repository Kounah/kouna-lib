export function delay(time?: number) {
  if(typeof time === 'number' && time > 0) {
    return new Promise<void>(resolve => setTimeout(() => resolve(), time));
  } else return new Promise<void>(resolve => resolve());
}