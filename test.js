'use strict';
var  path = require('path')
, basename = path.basename(path.dirname(__filename))
, util = require('util')
, should = require('should')
, tester = require('dm-core').tester
, command = require('./index.js')
;


describe(basename, function () {

    describe('PUT string without expression', function () {
        it('should return the same', function (done) {
            tester(command, {})
            .send(' xxx\n')
            .end(function (err, res) {
                res.should.equal(' xxx\n');
                done();
              }
            );
          }
        )
      }
    )
    describe('PUT empty string and expression', function () {
        it('should return nothing', function (done) {
            tester(command, {})
            .send(' \n')
            .end(function (err, res) {
                res.should.equal(' \n');
                done()
              }
            )
          }
        )
      }
    )


    describe('PUT unknown string', function () {
        it('should return 200', function (done) {
            tester(command, { regex: 'yyy' })
            .send(' xxx\n')
            .end(function (err, res) {
                res.should.equal('');
                done()
              }
            )
          }
        )
      }
    )

    describe('PUT simple string ', function () {
        it('should only return bbb', function (done) {
            tester(command, { regex: 'bbb', delimiter: '\n' })
            .send('aaa\nbbb\nccc\n')
            .end(function (err, res) {
                should.exist(res)
                res.should.equal('bbb\n')
                done()
              }
            )
          }
        )
        it('should not return bbb', function (done) {
            tester(command, { regex: 'bbb', invert: true })
            .send('aaa\nbbb\nccc\n')
            .end(function (err, res) {
                should.exist(res)
                res.should.equal('aaa\nccc\n')
                done()
              }
            )
          }
        )
        it('should not return ccc', function (done) {
            tester(command, { regex: 'ccc', invert: true })
            .send('aaa\nbbb\nccc')
            .end(function (err, res) {
                should.exist(res)
                res.should.equal('aaa\nbbb\n')
                done()
              }
            )
          }
        )
      }
    )


    describe('PUT simple string (change delimiter)', function () {
        it('should only return bbb', function (done) {
            tester(command, { regex: 'bbb', delimiter: '\\t' })
            .send('aaa\tbbb\tccc\t')
            .end(function (err, res) {
                should.exist(res)
                res.should.equal('bbb\t')
                done()
              }
            )
          }
        )
        it('should not return bbb', function (done) {
            tester(command, { regex: 'bbb', invert: true, delimiter: '\\t' })
            .send('aaa\tbbb\tccc\t')
            .end(function(err, res) {
                should.exist(res)
                res.should.equal('aaa\tccc\t')
                done()
              }
            )
          }
        )
        it('should not return ccc', function (done) {
            tester(command, { regex: 'ccc', invert: true, delimiter: '\\t' })
            .send('aaa\tbbb\tccc')
            .end(function(err, res) {
                should.exist(res)
                res.should.equal('aaa\tbbb\t')
                done()
              }
            )
          }
        )
      }
    )



    describe('PUT more complex string', function () {
        it('should return one line', function (done) {
            tester(command, { regex: '^ab.*', delimiter: '\t' })
            .send('abc\nabb\nacb\n')
            .end(function(err, res) {
                should.exist(res)
                res.should.equal('abc\nabb\n')
                done();
              }
            );
          }
        );
      }
    );

  }
);
