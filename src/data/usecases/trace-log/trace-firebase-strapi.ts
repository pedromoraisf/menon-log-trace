import {
  TraceLog,
  LogReceive,
  Log,
  TraceFirebaseStrapiRepository,
} from "./trace-firebase-strapi-protocols";

export class TraceFirebaseStrapi implements TraceLog {
  private readonly traceFirebaseStrapiRepository: TraceFirebaseStrapiRepository;
  private readonly logDefault = {
    operation: "",
    isErr: true,
    payload: {
      title: "",
      body: "",
    },
  };

  constructor(traceFirebaseStrapiRepository: TraceFirebaseStrapiRepository) {
    this.traceFirebaseStrapiRepository = traceFirebaseStrapiRepository;
  }

  async trace(log: LogReceive = this.logDefault): Promise<Log> {
    const treatedLog = this.treatLog(log);
    const savedLog = await this.traceFirebaseStrapiRepository.saveLog(
      treatedLog
    );

    return savedLog;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  treatLog(log: any = this.logDefault): LogReceive {
    const payloadTitleIsString = log.payload?.title === "string";
    const payloadBodyIsString = log.payload?.body === "string";

    return {
      operation: typeof log.operation === "string" ? log.operation : "",
      isErr: typeof log.isErr === "boolean" ? log.isErr : false,
      payload: {
        title: payloadTitleIsString ? log.payload.title : "",
        body: payloadBodyIsString ? log.payload.body : "",
      },
    };
  }
}