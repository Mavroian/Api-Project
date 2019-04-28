const { server } = require("../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const app = server();

describe("API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(app);
  });
  describe("Restfull", () => {
    it("Should print hello ", async () => {
      const res = await request.get("/");
      console.log(res.text);
      res.text.should.deep.equal("hellllo");
    });
  });
});
