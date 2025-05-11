type Config = {
  headers: {
    Authorization: null | string
  }
}

export let config: Config = {
  headers: { Authorization: null }
}

export const setBasicAuth = (username: string, password: string) => {
  config = {
    headers: {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
    }
  }
}

export const clearBasicAuth = () => {
  config.headers.Authorization = null;
};
