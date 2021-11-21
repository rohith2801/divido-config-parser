const assert = require("assert");

const constants = require("../constants");
const { main } = require("..");

describe("config parser", () => {
    it("should console staging cache json object", () => {
        const paths = [
            "jsons/config.json",
            "jsons/config.local.json",
            "jsons/config.stage.json",
        ];

        const key = "cache";
        const fileType = constants.FILE_TYPE_JSON;

        const response = main(fileType, paths, key);
        assert("stagehost", response.host);
    });

    it("should throw invalid path exception", () => {
        const paths = ["jsons/invalid path"];

        const key = "cache";
        const fileType = constants.FILE_TYPE_JSON;

        assert.throws(
            () => main(fileType, paths, key),
            "/Invalid path\\/json passed/"
        );
    });

    it("should throw invalid json exception", () => {
        const paths = ["jsons/config.invalid.json"];

        const key = "cache";
        const fileType = constants.FILE_TYPE_JSON;

        assert.throws(
            () => main(fileType, paths, key),
            "/Invalid path\\/json passed/"
        );
    });

    it("should warn for key doesn't exists in json data", () => {
        const paths = [
            "jsons/config.json",
            "jsons/config.local.json",
            "jsons/config.stage.json",
        ];

        const key = "nokeyinjson";
        const fileType = constants.FILE_TYPE_JSON;

        const response = main(fileType, paths, key);
        assert.equal(undefined, response);
    });
});
