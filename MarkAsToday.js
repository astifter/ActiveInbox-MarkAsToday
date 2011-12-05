var PAGE_SIZE = 100;
var TODAY_LABEL = "C/Today";
var OVERDUE_LABEL = "C/Overdue";

function setup() {
  // Create the labels we’ll need
  GmailApp.createLabel(OVERDUE_LABEL);
  GmailApp.createLabel(TODAY_LABEL);
}

function markToday()
{
  var d = new Date();

  var daylabel = "label:d-d-" + d.getDate();
  var monthlabel = "label:d-m-" + (d.getMonth()+1);
  var search = daylabel + " " + monthlabel;
  
  todaylabel = GmailApp.getUserLabelByName(TODAY_LABEL);
  overduelabel = GmailApp.getUserLabelByName(OVERDUE_LABEL);
  
  page = null;
  // get threads in "pages" of PAGE_SIZE at a time
  while(!page || page.length == PAGE_SIZE) {
    page = todaylabel.getThreads(0, PAGE_SIZE);
    if (page.length > 0) {
      // move the threads from "today" into "overdues" label
      overduelabel.addToThreads(page);
      todaylabel.removeFromThreads(page);
    }  
  }

  page = null;
  // get threads in "pages" of PAGE_SIZE at a time
  while(!page || page.length == PAGE_SIZE) {
    page = GmailApp.search(search, 0, PAGE_SIZE);
    if (page.length > 0) {
      // mark the threads from "today" search with "today" label
      todaylabel.addToThreads(page);
    }  
  }
}
