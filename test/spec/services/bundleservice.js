'use strict';

describe('Service: BundleService', function () {

  // load the service's module
  beforeEach(module('catReceiptApp'));

  // instantiate service
  var BundleService;
  beforeEach(inject(function (_BundleService_) {
    BundleService = _BundleService_;
  }));

  it('should do something', function () {
    expect(!!BundleService).toBe(true);
  });

});
