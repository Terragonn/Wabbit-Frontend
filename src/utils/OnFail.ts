export async function onFail(fn: () => any, failFn?: () => any) {
    try {
        await fn();
    } catch (e: any) {
        if (failFn) failFn();
    }
}
