const sdk = require('api')('@qase/v1.0#6oh8mlr9c1xd2');

sdk.auth('94f92a70a84f379d731c1f8f7525c1c2f10417ea6af62359dec4b57bb71cf28f');
sdk.getCases({limit: '10', offset: '0', code: 'code'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));