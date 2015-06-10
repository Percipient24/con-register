'use strict';

describe('Service: ItemFactory', function () {

  // load the service's module
  beforeEach(module('catReceiptApp'));

  // instantiate service
  var ItemFactory;
  beforeEach(inject(function (_ItemFactory_) {
    ItemFactory = _ItemFactory_;
  }));

  it('should do something', function () {
    expect(!!ItemFactory).toBe(true);
  });

});
