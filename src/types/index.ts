export type NewsItem = {
    id: string;
    webTitle: string;
    pillarName: string;
    webPublicationDate: string;
    sectionName: string;
};

export type GuardianApiResponse = {
    response: {
        status: string;
        userTier: string;
        total: number;
        startIndex: number;
        pageSize: number;
        currentPage: number;
        pages: number;
        orderBy: string;
        results: NewsItem[];
    };
}