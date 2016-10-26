/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    'use strict';
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
      var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var url_regex = new RegExp(expression);
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty.
       */
      it('should be defined', function () {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
      });

      it('URLs should be defined, not null, contains strings and correct format', function () {
        for (var i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].url).toBeDefined();
          expect(allFeeds[i].url).not.toBeNull();
          expect(allFeeds[i].url.length).not.toEqual(0);
          expect(allFeeds[i].url).toMatch(url_regex);
        }
      });

      it('names should be defined, not null, contains strings', function () {
        for (var i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].name).toBeDefined();
          expect(allFeeds[i].name).not.toBeNull();
          expect(allFeeds[i].name.length).not.toEqual(0);
        }
      });
    });

    describe('The menu', function () {
      var body = $('body');

      it('should be hidden by default', function () {
        expect(body.hasClass('menu-hidden')).toBe(true);
      });

      it('should toggles visibility when hamburger icon is clicked', function () {
        var menuIcon = $('.menu-icon-link');

        menuIcon.click();
        expect(body.hasClass('menu-hidden')).toBeFalsy();
        menuIcon.click();
        expect(body.hasClass('menu-hidden')).toBeTruthy();
      });
    });

    describe('Initial Entries', function () {

      beforeEach(function (done) {
        loadFeed(0, done);
      });

      it('should have one or more entries', function () {
        expect($('.feed .entry').length).toBeGreaterThan(0);
      });
    });

    describe('New Feed Selection', function() {
      var initialFeed;

      beforeEach(function (done) {
        /* Load an initial feed */
        loadFeed(0, function () {
          initialFeed = $('.entry-link').attr('href');
          /* Call loadFeed again but different feed */
          loadFeed(1, done);
        });
      });

      it('should load a new feed', function () {
        var newFeed = $('.entry-link').attr('href');
        expect(newFeed).not.toEqual(initialFeed);
      });
    });
}());
