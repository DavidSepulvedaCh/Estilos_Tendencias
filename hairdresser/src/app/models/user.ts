export class User {
    constructor(
        public name: string,
        public lastName: string,
        public email: string,
        public password: string,
        public role: string,
        public image: string
    ) { }
}