module.exports = {
  name: 'dictionary',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dictionary',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
