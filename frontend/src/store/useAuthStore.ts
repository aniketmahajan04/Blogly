import { create } from 'zustand';

const useAuthStore = create((set)) => ({
    user: null,
    token: null,
    isLoggedIn: false,
    lodading: false,
    error: null,

    login: async (email, password) => {
        set({loading: true, error: null});
        try{
            const response = await fetch('https://localhost:3000/graphql', {
                methode: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    query: `
                      query GetUserByToken($email: String!, $password: String!) {
                        getUserByToken(email: $email, password: $password)
                       }
                      `,
                    variables: {
                        email,
                        password,
                    }
                }),
                })
            const json = await response.json();
            const token = json.data.getUserByToken;
            if(!token) {
              throw new Error('Invalid token');
            }

            set({token, isLoggedIn: true, loading: false});
            localStorage.setItem('token', token);
        }catch(err){
            set({error: erro.massage. loading: false});
        }
    }
})
