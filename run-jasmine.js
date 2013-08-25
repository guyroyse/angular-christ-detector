(function() {

  var system = require('system');

  if (system.args.length !== 2) {
      console.log('Usage: run-jasmine.js URL');
      phantom.exit(1);
  }

  var pageUrl = system.args[1];

  var waitFor = function(conditionCallback, readyCallback, timeoutMillis) {

    var start = new Date().getTime();

    var timedOut = function() {
      var now = new Date().getTime();
      var expiredTime = now - start;
      return expiredTime > timeoutMillis;
    };

    var intervalId = setInterval(function() {

      if (conditionCallback()) {
        readyCallback();
        clearInterval(intervalId);
        return;
      }

      if (timedOut()) phantom.exit(1);

    }, 100);

  };

  var page = require('webpage').create();

  var areTestsCompleted = function() {
    return page.evaluate(function() {
      return document.body.querySelector('.symbolSummary .pending') === null;
    });
  };

  var generateTestReport = function() {

    var exitCode = page.evaluate(function(){

        var elementInnerText = function(selector) {
          return document.body.querySelector(selector).innerText.trim();
        };

        var title = function() {
          return elementInnerText('span.title');
        };

        var version = function() {
          return elementInnerText('span.version');
        };

        var duration = function() {
          return elementInnerText('span.duration');
        };

        var printHeader = function() {
          console.log('');
          console.log(title().concat(' ').concat(version()));
          console.log('');
        };

        printHeader();

        var list = document.body.querySelectorAll('.results > #details > .specDetail.failed');
        if (list && list.length > 0) {
          console.log('');
          console.log(list.length + ' test(s) FAILED:');
          for (i = 0; i < list.length; ++i) {
              var el = list[i],
                  desc = el.querySelector('.description'),
                  msg = el.querySelector('.resultMessage.fail');
              console.log('');
              console.log(desc.innerText);
              console.log(msg.innerText);
              console.log('');
          }
          return 1;
        } else {
          console.log(document.body.querySelector('.alert > .passingAlert.bar').innerText);
          return 0;
        }

    });

    phantom.exit(exitCode);

  };

  page.onConsoleMessage = function(msg) {
    console.log(msg);
  };

  page.open(pageUrl, function(status){

    if (status !== "success") {
      console.log("Unable to load page");
      phantom.exit();
    }

    waitFor(areTestsCompleted(), generateTestReport(), 5000);

  });


})();
