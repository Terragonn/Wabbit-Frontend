export default function parseNumber(num: number): string {
    // Appreviate a number with its alphabetical representation
    if (Math.abs(num) > 1e9) return Math.round((100 * num) / 1e9) / 100 + "B";
    else if (Math.abs(num) > 1e6) return Math.round((100 * num) / 1e6) / 100 + "M";
    else if (Math.abs(num) > 1e3) return Math.round((100 * num) / 1e3) / 100 + "K";
    else {
        const ret = Math.abs(num) > 1 ? Math.round(num * 100) / 100 : num.toPrecision(2);
        return ret.toString();
    }
}
