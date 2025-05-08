export const API_URLS = {
  auth: {
    signup: "auth/signup",
    login: "auth/login"
  },
  users: {
    main: "users",
    id: (id: string) => `users/${id}`,
    follow: (id: string) => `users/${id}/follow`
  },
  tweets: {
    main: "tweets",
    id: (id: string) => `tweets/${id}`,
    like: (id: string) => `tweets/${id}/like`,
    retweet: (id: string) => `tweets/${id}/retweet`,
  },
  comments: {
    main: "comments",
    id: (id: string) => `comments/${id}`
  }
};