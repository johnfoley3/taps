module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  forceExit: true,
  testMatch: ['**/test/**/!(lib)/*.[jt]s?(x)'],
  testPathIgnorePatterns: ["/helpers.ts"]
};
