const concat = (...jsons) => {
    let output = {};
    jsons.forEach((json) => (output = Object.assign(output, JSON.parse(json))));

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

const prod =
    '{"environment":"production","database":{"host":"mysql","port":3306,"username":"divido","password":"divido"},"cache":{"redis":{"host":"redis","port":6379}}}';
const dev =
    '{"environment":"dev","database":{"host":"devmysql","port":3306,"username":"divido","password":"divido"},"cache":{"redis":{"host":"redis","port":6379}}}';

const key = "database.host";

const response = parser(concat(prod, dev), key);
console.warn(response);
