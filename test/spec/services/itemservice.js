'use strict';

describe('Service: ItemService', function () {

  // load the service's module
  beforeEach(module('catReceiptApp'));

  // instantiate service
  var ItemService;
  beforeEach(inject(function (_ItemService_) {
    ItemService = _ItemService_;
  }));

  it('should do something', function () {
    expect(!!ItemService).toBe(true);
  });

});
