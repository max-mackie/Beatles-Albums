import CredentialsProvider from 'next-auth/providers/credentials';

export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "password"
                }
            },
            async authorize(credentials) {
                // This is where you would retrieve user data to verify with credentials
                // https://next-auth.js.org/configuration/providers/credentials
                const user = {id: "1", name:"testUser", password:"password"}
                if(credentials?.username === user.name && credentials?.password === user.password){
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
};
