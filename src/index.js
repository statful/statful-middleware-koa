const timer = require("./timer");
const getStatusCategory = require("./statusCodes").getCategory;

module.exports = statful => async (ctx, next) => {
  const statfulTimer = timer();

  await next();

  statful.timer("response_time", statfulTimer(), {
    tags: {
      hostname: ctx.hostname,
      method: ctx.method,
      statusCode: ctx.status,
      statusCodeCategory: getStatusCategory(ctx.status)
    }
  });
};
