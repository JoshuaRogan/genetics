export function isLocalHost() {
    if (typeof window === 'undefined') {
        return true;
    }

    return window.location.href.includes('localhost');
}