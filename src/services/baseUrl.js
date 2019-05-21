var baseURL = ""

if (process.env.NODE_ENV == "development") {
    baseURL = "";
}

export default baseURL;