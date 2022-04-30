export async function onFail(fn: () => Promise<any>, failFn?: () => any) {
    try {
        await fn();
    } catch (e: any) {
        if (failFn) failFn();
    }
}
