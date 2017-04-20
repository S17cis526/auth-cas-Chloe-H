var assert = require('assert');
var authCAS = require('../lib/auth-cas');
var http = require('http');
var config = require('./test-config.json');

// Description of what the test does
it('A host must be supplied.', function() {
    assert.throws(
        () => {
            new authCAS(); // this should throw an exception
        },
        /Host must be supplied/
    );

    assert.throws(
        () => {
            new authCAS(undefined); // this should also throw an exception
        },
        /Host must be supplied/
    );
});

it('A CAS host must be specified.', function() {
    assert.throws(
        () => {
            new authCAS('https://cashost.com'); // same
        },
        /A CAS Host must be specified/
    );
});

it.(
    'Visiting the login page should redirect to the CAS server login page',
    function(done) {
        // asynchronous callback
        http.get(config.host + '/login', function(res) {
            assert.equals(res.statusCode, 302);
            var location = url.parse(res.headers.location);
            var expected = url.parse(config.casHost);
            var service = encodeURIComponent(config.host + '/login');
            assert.equals(location.protocol, expected.protocol);
            assert.equals(location.hostname, expected.hostname);
            assert.equals(location.port, expected.port);
            assert.equals(location.pathname, '/login');
            assert.equals(location.search, '?service=' + service);
        });
    }
);
