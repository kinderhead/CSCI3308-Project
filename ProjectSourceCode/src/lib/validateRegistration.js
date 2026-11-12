/**
 * @param {{ password?: unknown }} input
 */
export function validateRegistration(input) {
    return (
        typeof input.password === 'string' &&
        input.password.length >= 8
    );
}
