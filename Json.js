"use strict";

function Json() {}

Json.prototype.parse = function (json, key) {
    const keyArray = key.split(".");
    let response = json;
    keyArray.forEach((keyElement) => {
        response = response[keyElement];
    });

    return response;
};

function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
}

function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

Json.prototype.merger = function (...jsons) {
    let response = {};
    jsons.forEach((json) => {
        response = mergeDeep(response, JSON.parse(json));
    });

    return response;
};

module.exports = Json;
