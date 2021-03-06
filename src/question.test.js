/* global describe, it, expect, beforeEach */

'use strict';

(function () {

  var question = require('./question');

  function mockRandom (number) {
    Math.random = function () {
      return number;
    };
  }

  beforeEach(function () {
    mockRandom(0);
  });

  describe('question', function () {

    describe('getResponse', function () {

      it('should respond with errors', function () {
        expect(question.getResponse()).toEqual({error: 'No message supplied.'});
        expect(question.getResponse('')).toEqual({error: 'No message supplied.'});
        expect(question.getResponse('/diceman')).toEqual({error: 'No message supplied.'});
        expect(question.getResponse('/diceman   ')).toEqual({error: 'No message supplied.'});
      });

      it('should answer yes or no questions', function () {
        expect(question.getResponse('?')).toEqual({message: 'Yes'});
        expect(question.getResponse('Is this a yes or no question?')).toEqual({message: 'Yes'});
        expect(question.getResponse('   is this a yes or no question?  ')).toEqual({message: 'Yes'});
      });

      it('should pick a random item', function () {
        expect(question.getResponse('1, 2, 3, and 4')).toEqual({message: '1'});
        expect(question.getResponse('   1, 2, 3, and 4   ')).toEqual({message: '1'});
        expect(question.getResponse(' 1, 2, 3 or 4   ')).toEqual({message: '1'});
        expect(question.getResponse('1,2,3,4')).toEqual({message: '1'});

        mockRandom(0.99);

        expect(question.getResponse('1, 2, 3, and 4')).toEqual({message: '4'});
        expect(question.getResponse('   1, 2, 3, and 4   ')).toEqual({message: '4'});
        expect(question.getResponse(' 1, 2, 3 or 4   ')).toEqual({message: '4'});
        expect(question.getResponse('1,2,3,4')).toEqual({message: '4'});
      });

      it('should pick a random item after a question', function () {
        expect(question.getResponse('Which number? 1, 2, 3, and 4')).toEqual({message: '1'});
        expect(question.getResponse('   Which number?    1, 2, 3, and 4   ')).toEqual({message: '1'});
        expect(question.getResponse('Which number?  1, 2, 3 or 4   ')).toEqual({message: '1'});
        expect(question.getResponse('Which number?1,2,3,4')).toEqual({message: '1'});

        mockRandom(0.99);

        expect(question.getResponse('Which number? 1, 2, 3, and 4')).toEqual({message: '4'});
        expect(question.getResponse('   Which number?    1, 2, 3, and 4   ')).toEqual({message: '4'});
        expect(question.getResponse('Which number?  1, 2, 3 or 4   ')).toEqual({message: '4'});
        expect(question.getResponse('Which number?1,2,3,4')).toEqual({message: '4'});
      });

      it('should capitalize answers', function () {
        expect(question.getResponse('one, two or three')).toEqual({message: 'One'});

        mockRandom(0.99);

        expect(question.getResponse('one, two or three')).toEqual({message: 'Three'});
      });

      it('should not separate by "and"', function () {
        expect(question.getResponse('one and two or three')).toEqual({message: 'One and two'});

        mockRandom(0.99);

        expect(question.getResponse('one, two and three')).toEqual({message: 'Two and three'});
      });

      it('should not separate by "and" or "or" mid-word', function () {
        expect(question.getResponse('Randy or George')).toEqual({message: 'Randy'});

        mockRandom(0.99);

        expect(question.getResponse('Randy, George')).toEqual({message: 'George'});
      });

    });

  });

})();
