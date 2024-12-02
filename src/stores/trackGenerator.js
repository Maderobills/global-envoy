export function generateTrackingNumber(options = {}) {
    const { prefix = 'GLO', length = 12 } = options;
    const timestamp = new Date().toISOString().slice(2, 10).replace(/-/g, '').slice(0, 6);
    const randomLength = length - prefix.length - timestamp.length;
    const randomChars = Array.from(
        { length: randomLength },
        () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]
    ).join('');
    return `${prefix}${timestamp}${randomChars}`;
}
