'use strict';

describe('Service: SalesService', function () {

  // load the service's module
  beforeEach(module('catReceiptApp'));

  // instantiate service
  var SalesService;
  beforeEach(inject(function (_SalesService_) {
    SalesService = _SalesService_;
  }));

  it('should do something', function () {
    expect(!!SalesService).toBe(true);
  });

});
