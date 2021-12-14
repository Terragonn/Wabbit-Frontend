export default function parseTime(time: number) {
    const now = new Date().getTime();
    const seconds = new Date(time).getTime();
    let delta = (seconds - now) / 1000;

    const days = Math.floor(delta / 86400);
    delta %= 86400;

    const hours = Math.floor(delta / 3600);
    delta %= 3600;

    const mins = Math.floor(delta / 60);

    return `${days}d ${hours}h ${mins}m`;
}
