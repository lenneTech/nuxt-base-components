export function useAuthentication() {

    /**
     * Sign in user
     * @param input
     */
    async function signIn(input: { email: string, password: string }) {
        console.debug('signIn', input);
        return {data: null, error: null}
    }

    /**
     * Sign up user
     * @param input
     */
    async function signUp(input: { email: string, password: string }) {
        console.debug('signUp', input);
        return {data: null, error: null}
    }

    async function sendResetPasswordMail(email: string) {
        console.debug('sendResetPasswordMail', email);
        return {data: null, error: null}
    }

    async function checkToken(token: string) {
        console.debug('checkToken', token);
    }

    async function resetPassword(token: string, password: string) {
        console.debug('resetPassword', token, password);
    }

    function signInViaGoogle() {
        console.debug('Signin via Google');
    }

    function signInViaApple() {
        console.debug('Signin via Apple');
    }

    function signUpViaGoogle() {
        console.debug('Signup via Google');
    }

    function signUpViaApple() {
        console.debug('Signup via Apple');
    }

    return {
        checkToken,
        resetPassword,
        sendResetPasswordMail,
        signIn,
        signInViaApple,
        signInViaGoogle,
        signUp,
        signUpViaApple,
        signUpViaGoogle,
    };
}
