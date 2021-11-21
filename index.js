const fs = require("fs");
const constants = require("./constants");
const Json = require("./Json");

const merger = (fileType, ...fileData) => {
    switch (fileType) {
        case constants.FILE_TYPE_JSON:
            const jsonObj = new Json();
            return jsonObj.merger(...fileData);
    }
};

const parser = (fileType, data, key) => {
    switch (fileType) {
        case constants.FILE_TYPE_JSON:
            const jsonObj = new Json();
            return jsonObj.parse(data, key);
    }
};

const main = (fileType, paths, key) => {
    const fileData = [];
    try {
        paths.forEach((path) => {
            fileData.push(fs.readFileSync(path));
        });
    } catch (e) {
        throw "Invalid path/json passed";
    }

    if (fileData.length === 0) {
        throw "No config found";
    }

    const mergedData = merger(fileType, ...fileData);
    const response = parser(fileType, mergedData, key);

    if (!response) {
        console.warn(`No data found for key: ${key}`);
        return;
    }

    console.log(response);
};

const paths = [
    "jsons/config.json",
    "jsons/config.local.json",
    "jsons/config.stage.json",
];

const key = "cache";
const fileType = constants.FILE_TYPE_JSON;

main(fileType, paths, key);
