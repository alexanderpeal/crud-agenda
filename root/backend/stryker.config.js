// @ts-check
/**
* @type {import('@stryker-mutator/api/core').PartialStrykerOptions}
*/
module.exports =  {
  packageManager: "npm",
  reporters: ["clear-text", "progress"],
  testRunner: "mocha",
  coverageAnalysis: "perTest"
};
