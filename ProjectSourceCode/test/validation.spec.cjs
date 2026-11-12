
const { expect } = require('chai');

describe('Registration validation', () => {
    let validateRegistration;

    before(async () => {
        ({ validateRegistration } = await import(
            '../src/lib/validateRegistration.js'
        ));
    });

    it('accepts a valid password', () => {
        expect(validateRegistration({
            password: 'Password123!'
        })).to.equal(true);
    });

    it('rejects a missing password', () => {
        expect(validateRegistration({})).to.equal(false);
    });

    it('rejects a password shorter than 8 characters', () => {
        expect(validateRegistration({
            password: '12345'
        })).to.equal(false);
    });
});
