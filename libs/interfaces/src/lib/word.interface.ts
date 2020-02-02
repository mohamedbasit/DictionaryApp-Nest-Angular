interface Dictionary {
    [key: string]: Object[] | string;
}

export interface Word {
    word: string;
    results: Dictionary[];
}