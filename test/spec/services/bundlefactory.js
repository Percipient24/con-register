'use strict';

describe('Service: BundleFactory', function () {

  // load the service's module
  beforeEach(module('catReceiptApp'));

  // instantiate service
  var BundleFactory;
  beforeEach(inject(function (_BundleFactory_) {
    BundleFactory = _BundleFactory_;
  }));

  it('should do something', function () {
    expect(!!BundleFactory).toBe(true);
  });

});
