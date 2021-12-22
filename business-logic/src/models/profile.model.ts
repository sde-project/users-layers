export interface Profile {
    _id?: string,
    user?: string,
    username?: string,
    name?: string,
    bio?: string,
    links?: Array<{
        website?: string,
        text?: string,
    }>,
    cryptos?: Array<string>,
    following?: Array<string>,
    public?: boolean,
}