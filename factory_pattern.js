// class factory
function fooFactory(easyToMockFunction) {
 
	var self, Foo;
 
	// constructor
	Foo = self = function Foo() {};
 
	// static method
	self.bar = function () {};
 
	// instance method
	self.prototype.baz = function () {};
 
	return self;
}
 
// class
var Foo = fooFactory(function () {
	// something that might need to be mocked
});
 
// class instance
var foo = new Foo();
