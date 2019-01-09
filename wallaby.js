module.exports = function() {
  return {
    files: ["**/*.js", { pattern: "**/*.test.js", ignore: true }],

    tests: ["**/*.test.js"],

    env: {
      type: "node"
    }
  };
};
