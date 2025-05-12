type Config = {
  headers: {
    Authorization: null | string
  }
}

export const config: Config = {
  headers: { Authorization: null },
};

export const setBasicAuth = (username: string, password: string) => {
  const encoded = btoa(`${username}:${password}`);
  config.headers.Authorization = `Basic ${encoded}`;
}

export const clearBasicAuth = () => {
  config.headers.Authorization = null;
};
