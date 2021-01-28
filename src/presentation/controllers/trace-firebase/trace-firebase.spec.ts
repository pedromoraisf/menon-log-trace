import { TraceFirebaseController } from "./trace-firebase";
import { ValidatePayloadUtil } from "../../helpers/validate-payload";
import { TraceLog, LogReceive } from "./trace-firebase-protocols";

const makeFakeRequest = (): LogReceive => ({
  operation: "any_operation",
  isErr: false,
  payload: {
    title: "any_title",
    body: "any_body",
  },
});

const makeTraceLogStub = (): TraceLog => {
  class TraceLogStub implements TraceLog {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async trace(log: LogReceive = makeFakeRequest()): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new TraceLogStub();
};

interface SutTypes {
  sut: TraceFirebaseController;
  traceLogStub: TraceLog;
}

const makeSut = (): SutTypes => {
  const traceLogStub = makeTraceLogStub();
  const validatePayloadUtil = new ValidatePayloadUtil();
  const sut = new TraceFirebaseController(validatePayloadUtil, traceLogStub);

  return {
    sut,
    traceLogStub,
  };
};

describe("TraceFirebase Controller", () => {
  it("should returns resultCode 400 if operation property is not provided", () => {
    const { sut } = makeSut();

    const testablePayload = {
      isErr: false,
      payload: {},
    };

    expect(sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) operation is not provided",
    });
  });

  it("should returns resultCode 400 if irErr property is not provided", () => {
    const { sut } = makeSut();

    const testablePayload = {
      operation: "any_operation",
      payload: {},
    };

    expect(sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) isErr is not provided",
    });
  });

  it("should returns resultCode 400 if payload property is not provided", () => {
    const { sut } = makeSut();

    const testablePayload = {
      operation: "any_operation",
      isErr: false,
    };

    expect(sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) payload is not provided",
    });
  });

  it("should returns resultCode 400 if payload and isErr property is not provided", () => {
    const { sut } = makeSut();

    const testablePayload = {
      operation: "any_operation",
    };

    expect(sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) isErr, payload is not provided",
    });
  });

  it("should call TraceLog with correct values", () => {
    const { sut, traceLogStub } = makeSut();

    const traceSpy = jest.spyOn(traceLogStub, "trace");

    const fakeRequest = makeFakeRequest();
    sut.handle(fakeRequest);

    expect(traceSpy).toHaveBeenCalledWith(fakeRequest);
  });
});
