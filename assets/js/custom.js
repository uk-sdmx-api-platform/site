// Add any custom javascript here.

opensdg.dataRounding = function(value) {
  if (value == null) {
    return value
  }
  else {
    return Number(value.toPrecision(3))
  }
};

$('td:contains("Not available for this indicator")')
    .addClass('meta-not-available');
