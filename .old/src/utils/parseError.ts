export default async function parseError(fn: () => Promise<any>) {
    try {
        return await fn();
    } catch {
        return undefined;
    }
}
