const fs = require("fs");

const merger = (...jsons) => {
    let output = {};
    jsons.forEach((json) => (output = Object.assign(output, json)));

    return output;
};

const parser = (json, key) => {
    const keyArray = key.split(".");
    let response = json;
    keyArray.forEach((keyElement) => {
        response = response[keyElement];
    });

    return response;
};

const main = () => {
    const paths = [
        "json/config.json",
        "jsons/config.local.json",
        "jsons/config.invalid.json",
    ];

    const jsons = [];
    try {
        paths.forEach((path) => {
            jsons.push(JSON.parse(fs.readFileSync(path)));
        });
    } catch (e) {
        throw "Invalid path/json passed";
    }

    if (jsons.length === 0) {
        throw "No config found";
    }

    const key = "database.host";

    const response = parser(merger(...jsons), key);
    console.warn(response);
};

main();
