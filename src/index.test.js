const middleware = require("./index.js");

describe("Middleware", () => {
  it("should not be null", () => {
    expect(middleware).not.toBeNull();
  });

  it("should send timer to Statful", async () => {
    const statful = {
      timer: () => {}
    };
    const ctx = {
      hostname: "localhost",
      method: "GET",
      status: 200
    };

    spyOn(statful, "timer");
    await middleware(statful)(ctx, () => {});

    expect(statful.timer).toHaveBeenCalledWith(
      "response_time",
      expect.any(Number),
      {
        tags: {
          hostname: "localhost",
          method: "GET",
          statusCode: 200,
          statusCodeCategory: "success"
        }
      }
    );
  });
});
