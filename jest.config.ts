module.exports = {
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy"
    },
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    setupFilesAfterEnv: ["./src/test/setupTests.ts"],
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
  };