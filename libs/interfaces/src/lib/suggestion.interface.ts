interface Query {
    limit: string;
    page: number;
}

interface Results {
    total: number;
    data: string[];
}

export interface Suggestions {
    query: Query;
    results: Results;
}