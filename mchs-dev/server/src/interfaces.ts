export interface cpuResponse{
    percentage: number;
}

export interface MemoryResponse{
    status: string;
    errors: string;
}

export interface MemorySizeResponce{
    size:string;
    used:string;
    free:string;
    percentage: string;
}