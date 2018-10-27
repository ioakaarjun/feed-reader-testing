/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function() {
		// Testing to make sure allFeeds variable is defined and not empty
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});
		/* Testing that each feed in allFeeds object has url defined and it
		   is not empty
		*/
		it('has URL', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
		});
		/* Testing that each feed in allFeeds object has name defined and it
		   is not empty
		*/
		it('has name', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			})
		})
	});
	// Testing suite for menu
	describe('The menu', function() {
		// Test to ensure menu element is hidden by default
		it("is hidden by default", function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		// Test to ensure menu changes visibility when menu icon clicked
		it("changes visibility when menu icon clicked", function() {
			$('a.menu-icon-link').trigger('click'); // display when menu icon is clicked
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('a.menu-icon-link').trigger('click'); // hide when menu icon is clicked
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});
	// Testing suite for Initial Entries
	describe('Initial Entries', function() {
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});
		/* Test to ensure when loadFeed function is called and completes its
		   work,there is at least 1 .entry element within the .feed
		   container */
		it("has at least 1 entry after loadFeed function called", function(done) {
			var numEntries = document.querySelector(".feed").getElementsByClassName("entry").length;
			expect(numEntries).toBeGreaterThan(0);
			done();
		});
	});
	// Testing suite for New Feed Selection
	describe('New Feed Selection', function() {
		var initFeedSelection;
		beforeEach(function(done) {
			loadFeed(0, function() {
				initFeedSelection = document.querySelector(".feed").innerHTML;
				loadFeed(1, function() {
					done();
				});
			});
		});
		/* Test to ensure that when new feed is loaded by the loadFeed
		function the content actually changes */
		it("changes content when new feed loaded", function(done) {
			var newFeedSelection = document.querySelector(".feed").innerHTML;
			expect(initFeedSelection).not.toBe(newFeedSelection);
			done();
		});
	});
}());
