/* eslint-disable @typescript-eslint/no-explicit-any */
import { notificationModule } from "@infra/api/helper/modules";
import { PayloadResponse } from "@presentation/controllers/protocols";
import makeNotificationTraceLogController from "../../factories/notification-trace-log";

export default {
  setNotificationTraceLogEndpoint: (endpoint: string): void => notificationModule().setEndpoint(endpoint),
  notificationTraceLog: (payload: any): Promise<PayloadResponse> => makeNotificationTraceLogController().handle(payload),
};
