const path = require("path");
const replace = require("replace-in-file");

module.exports = async function (deployer) {
  await changeBasicConnectMemoryVarAddr();
};

// change mvar variable in basic.sol connector.
async function changeBasicConnectMemoryVarAddr() {
  var listInstance = await artifacts.require("InstaList").deployed();
  var eventInstance = await artifacts.require("InstaEvent").deployed();
  console.log("InstaList Address:", listInstance.address);
  console.log("InstaEvent Address:", eventInstance.address, "\n");

  const filePath = path.resolve(
    __dirname,
    "../contracts",
    "connectors/authority.sol"
  );
  const options = {
    files: filePath,
    from: [
      /return (.*); \/\/ InstaEvent Address/,
      /return (.*); \/\/ InstaList Address/,
    ],
    to: [
      `return ${eventInstance.address}; // InstaEvent Address`,
      `return ${listInstance.address}; // InstaMemory Address`,
    ],
  };

  //replace the memory and event address in the basic connector contract.
  await replace(options)
    .then((results) => {
      console.log(
        `Connectors/authority.sol has changed`,
        results[0].hasChanged
      );
    })
    .catch((error) => {
      console.error(`Connectors/authority.sol`, error);
    });

  // wait untill `truffle watch` compile the contracts again.
  await pause(10);
  return;
}

function pause(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms * 1000);
  });
}
