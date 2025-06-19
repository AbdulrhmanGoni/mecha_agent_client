export default function decorateNumber(number: number) {
    if (Math.abs(number) < 1000) return number.toString();

    const absNum = Math.abs(number);
    let formatted = '';

    if (absNum >= 1_000_000_000) {
        formatted = (number / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'b';
    } else if (absNum >= 1_000_000) {
        formatted = (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
    } else {
        formatted = (number / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    }

    return formatted;
}