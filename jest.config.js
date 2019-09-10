module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  reporters: ['default'],
  forceExit: true,
  testMatch: ['**/test/**/!(lib)/*.[jt]s?(x)'],
};
