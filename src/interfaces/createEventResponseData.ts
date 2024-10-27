export interface CreateEventResponseData {
    success: boolean;
    message: string;
    event: {
        id : number;
        title : string,
        description: string,
        eventDate: string,
        eventTime: string,
        createdAt: string,
        updatedAt: string,
        userId: number
    }
}
