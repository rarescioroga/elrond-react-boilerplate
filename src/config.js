const isProduction = process.env.REACT_APP_NODE_ENV === 'production';

export const apiUrl = isProduction ? 'https://api.tesserae.club' : 'https://api-dev.tesserae.club';
