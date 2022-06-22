const isProduction = process.env.REACT_APP_NODE_ENV === 'production';

export const smartContractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS;
export const smartContractImplementationInterface = process.env.REACT_APP_SMART_CONTRACT_IMPLEMENTATION_INTERFACE;
export const apiUrl = isProduction ? 'https://api.tesserae.club' : 'https://api-dev.tesserae.club';
export const chainID = isProduction ? 'M' : 'D';
