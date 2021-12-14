export default function parseTime(time: number) {
    const now = new Date().getTime();
    const seconds = new Date(time).getTime();
    let delta = seconds - now;

    const days = (delta / 86400).toFixed(0);
    delta %= 86400;

    const hours = (delta / 3600).toFixed(0);
    delta %= 3600;

    const mins = (delta / 60).toFixed(0);

    return `${days}d ${hours}h ${mins}m`;
}
