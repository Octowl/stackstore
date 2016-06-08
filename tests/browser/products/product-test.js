describe("Product Factory", function () {

    beforeEach(module('Cove'));

    var endpoint = 'api/products';
    var Product, $httpBackend;
    beforeEach(inject(function (_Product_, _$httpBackend_) {
        Product = _Product_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        try {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        } catch (err) {
            this.test.error(err);
        }
    });

    describe("getAll method", function () {

        var productArray = [{
            name: 'shagel',
            description: 'shagel vanilla',
            price: 5,
            inventory: 120
        }, {
            name: 'panadol ultra',
            description: 'extra codeine',
            price: 40,
            inventory: 50
        }];

        beforeEach(function () {
            $httpBackend.whenGET(endpoint)
                .respond(200, productArray);
        });
//don't you need a done since this is "async"

        it("gets all the products", function () {
            var products;
            $httpBackend.expectGET(endpoint);
            Product.getAll()
                .then(function (foundProducts) {
                    products = foundProducts;
                })
                .catch(console.error);
            $httpBackend.flush();
            expect(products).to.equal(productArray);
        });


    });

});
