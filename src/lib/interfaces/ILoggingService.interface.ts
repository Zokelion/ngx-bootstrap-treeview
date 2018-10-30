export interface ILoggingService {
    debug(...content: any[]);
    info(...content: any[]);
    log(...content: any[]);
    warn(...content: any[]);
    error(...content: any[]);
}
