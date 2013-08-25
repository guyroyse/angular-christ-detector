(function() {

  var system = require('system');

  /**
   * Wait until the test condition is true or a timeout occurs. Useful for waiting
   * on a server response or for a ui change (fadeIn, etc.) to occur.
   *
   * @param testFx javascript condition that evaluates to a boolean,
   * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
   * as a callback function.
   * @param onReady what to do when testFx condition is fulfilled,
   * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
   * as a callback function.
   * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
   */

  var waitFor = function(testCallback, readyCallback, timeOutMillis) {

    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3001;

    var intervalId;

    var start = new Date().getTime();
    var conditionMet = false;

    var notTimedOut = function() {
      var now = new Date().getTime();
      var expiredTime = now - start;
      return expiredTime < maxtimeOutMillis
    };

    var conditionNotMet = function() {
      return !conditionMet;
    };

    var intervalFx = function() {

      if (notTimedOut() && conditionNotMet()) {
        conditionMet = testCallback();
      } else {
        if(conditionNotMet()) {
            // If condition still not fulfilled (timeout but condition is 'false')
            phantom.exit(1);
        } else {
            // Condition fulfilled (timeout and/or condition is 'true')
            readyCallback();
            clearInterval(intervalId);
        }
      }

    };

    intervalId = setInterval(intervalFx, 100);

  };


  if (system.args.length !== 2) {
      console.log('Usage: run-jasmine.js URL');
      phantom.exit(1);
  }

  var page = require('webpage').create();

  // Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
  page.onConsoleMessage = function(msg) {
      console.log(msg);
  };

  page.open(system.args[1], function(status){
      if (status !== "success") {
          console.log("Unable to access network");
          phantom.exit();
      } else {
          waitFor(function(){
              return page.evaluate(function(){
                  return document.body.querySelector('.symbolSummary .pending') === null
              });
          }, function(){
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
          });
      }
  });


})();
