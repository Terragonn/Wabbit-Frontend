export function updateIfChanged<T>(updated: T, old: T, update: (val: T) => void) {
    if (updated != old) update(updated);
}
