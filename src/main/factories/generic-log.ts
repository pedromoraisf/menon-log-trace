import { Controller } from "@presentation/controllers/protocols";
import { GenericLogController } from "@presentation/controllers/generic-log";
import { ValidatePayloadHelper } from "@presentation/helpers/validate-payload";
import { GenericLogStrapi } from "@data/usecases/generic-log-strapi";
import { StrapiLogTraceRepository } from "@infra/api/strapi/log-trace";
import ApiHelper from "@infra/api/helper/api-helper";
import { HttpClient } from "@utils/http-client/http-client";

const makeStrapiLogTraceRepository = (): StrapiLogTraceRepository => {
  const httpClient = new HttpClient();
  return new StrapiLogTraceRepository(ApiHelper, httpClient);
};

const makeGenericLogStrapi = (): GenericLogStrapi => {
  const strapiLogTraceRepository = makeStrapiLogTraceRepository();
  return new GenericLogStrapi(strapiLogTraceRepository);
};

export default (): Controller => {
  const validatePayloadHelper = new ValidatePayloadHelper();
  const genericLogStrapi = makeGenericLogStrapi();
  return new GenericLogController(
    validatePayloadHelper,
    genericLogStrapi
  );
};

