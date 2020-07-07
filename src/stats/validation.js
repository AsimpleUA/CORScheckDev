export default {
    required: value => (typeof value !== "object" ? !!value : Object.keys(value).length > 0) || "Required field",
    link: v => {
        const pattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
        return pattern.test(v) || !v || 'Invalid url';
    },
    email: v => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(v) || !v || 'Invalid email';
    },
    phone: v => {
        const pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
        return pattern.test(v) || !v || 'Invalid phone number';
    }
}