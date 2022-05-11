const obj2gltf = require("obj2gltf");
const fs = require("fs");
obj2gltf('../../dist/client/models/Head_Sculpt_1.obj').then(function (gltf) {
  const data = Buffer.from(JSON.stringify(gltf));
  fs.writeFileSync("../../dist/client/models/Head_Sculpt_1.gltf", data);
});