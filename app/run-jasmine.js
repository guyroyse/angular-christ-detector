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

        var alertBarElement = function() {
          return document.body.querySelector('.alert>.bar');
        };

        var summaryElement = function() {
          return document.body.querySelector('.summary');
        };

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

        var alertBar = function() {
          return elementInnerText('.alert>.bar');
        };

        var elementIsSuite = function(element) {
          return element.classList.contains('suite');
        };

        var elementIsDescription = function(element) {
          return element.classList.contains('description');
        };

        var elementIsSpecSummary = function(element) {
          return element.classList.contains('specSummary');
        };

        var elementIsPassing = function(element) {
          return element.classList.contains('passed');
        };

        var thereAreFailedTests = function() {
          return alertBarElement().classList.contains('failingAlert');
        };

        var buildIndent = function(indent) {
          return Array((indent || 0) + 1).join('  ');
        };

        var printLine = function(line, indent) {
          var indentString = buildIndent(indent);
          console.log(indentString + (line || ''));
        };

        var red = '\033[31m';
        var green = '\033[32m';
        var normal = '\033[0m';

        var printFailingLine = function(line, indent) {
          printLine(red + line + normal, indent);
        };

        var printPassingLine = function(line, indent) {
          printLine(green + line + normal, indent);
        };

        var printHeader = function() {
          printLine();
          printLine(title() + ' ' + version());
        };

        var displayTestResults = function(element) {

          var indentLevel = 0;

          var printDescription = function(element) {
            if (indentLevel === 0) printLine();
            printLine(element.innerText.trim(), indentLevel);
            indentLevel++;
          };

          var printSpecSummary = function(element) {
            var specSummary = element.innerText.trim();
            if (elementIsPassing(element))
              printPassingLine(specSummary, indentLevel);
            else
              printFailingLine(specSummary, indentLevel);
          };

          var recurseTestResults = function(element) {

            Array.prototype.slice.apply(element.children).forEach(function(child) {
              if (elementIsSuite(child)) recurseTestResults(child);
              if (elementIsDescription(child)) printDescription(child);
              if (elementIsSpecSummary(child)) printSpecSummary(child);
            });

            indentLevel--;

          };

          recurseTestResults(summaryElement());

        };

        var displayFailureResults = function() {

          if (!thereAreFailedTests()) return;

          printLine();
          printLine('Failures:');
          printLine();

          var failedTests = document.body.querySelectorAll('.specDetail.failed');

          Array.prototype.slice.apply(failedTests).forEach(function(test) {
            printLine(test.children[0].innerText.trim(), 1);
            printFailingLine(test.children[1].children[0].innerText.trim(), 2);
            printLine();
          });
  
        };

        var printSummary = function() {
          printLine();
          printLine(duration());
          if (thereAreFailedTests())
            printFailingLine(alertBar());
          else 
            printPassingLine(alertBar());
          printLine();
        };

        printHeader();
        displayTestResults();
        displayFailureResults();
        printSummary();

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
