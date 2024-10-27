export interface UpdatedEventResponseData {
    success: boolean;
    message: string;
    updatedEvent: {
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
