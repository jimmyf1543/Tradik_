export default{
    name: 'Tradik',
    apiURL: `${process.env.BASE_API_URL}`,
    clientURL: process.env.CLIENT_URL,
};

export const port = process.env.PORT || 3000;

export const database = {
  url: process.env.MONGO_URI
};
