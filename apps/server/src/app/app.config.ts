//TODO: validate the configurations with "joi"
//We can add any required logic to cast values to an appropriate type, set default values
const configuration = () => ({
    api: {
        endpoint: isExist(process.env.API_ENDPOINT),
        host: isExist(process.env.API_HOST),
        key: isExist(process.env.API_KEY)
    }
});

export { configuration };




/**
 * Check value exist if not throw exception
 * @param configValue Configuration value
 */
function isExist(configValue: string) {
    if (configValue) {
        return configValue;
    }
    else {
        throw new Error("Config does not exist");
    }
}