const fs = require("fs");
const constants = require("./constants");

const merger = (fileType, ...fileData) => {
    switch (fileType) {
        case constants.FILE_TYPE_JSON:
            let output = {};
            fileData.forEach(
                (json) => (output = Object.assign(output, JSON.parse(json)))
            );

            return output;
    }
};

const parser = (fileType, data, key) => {
    switch (fileType) {
        case constants.FILE_TYPE_JSON:
            const keyArray = key.split(".");
            let response = data;
            keyArray.forEach((keyElement) => {
                response = response[keyElement];
            });

            return response;
    }
};

const main = () => {
    const paths = [
        "jsons/config.json",
        "jsons/config.local.json",
        // "jsons/config.invalid.json",
    ];

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

    const key = "database.host";
    const fileType = constants.FILE_TYPE_JSON;

    const response = parser(fileType, merger(fileType, ...fileData), key);
    console.warn(response);
};

main();
