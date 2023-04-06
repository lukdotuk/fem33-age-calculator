
const yPattern = "0000",

      dWarning = document.getElementById("warning-dd"),
      mWarning = document.getElementById("warning-mm"),
      yWarning = document.getElementById("warning-yyyy"),

      yearsOutput = document.getElementById("years-output"),
      monthsOutput = document.getElementById("months-output"),
      daysOutput = document.getElementById("days-output"),
      
      yOutputText = document.getElementById("y-text"),
      mOutputText = document.getElementById("m-text"),
      dOutputText = document.getElementById("d-text"),

      dLabel = document.getElementById("day-label"),
      mLabel = document.getElementById("month-label"),
      yLabel = document.getElementById("year-label"),

      emptyMsg = "This field is required",
      dMsg = "Must be a valid day",
      mMsg = "Must be a valid month",
      yMsg = "Must be in the past";

let dInputValue = document.getElementById("day-input"),
    mInputValue = document.getElementById("month-input"),
    yInputValue = document.getElementById("year-input");

    dValue = 0,
    mValue = 0,
    yValue = 0;

// reset
window.addEventListener("DOMContentLoaded", () => {
  dInputValue.value = "";
  mInputValue.value = "";
  yInputValue.value = "";
})

function inputWrongOrEmpty(itemWarning, itemWarningMsg, itemInputValue, itemLabel) {
  itemWarning.textContent = itemWarningMsg;
  itemWarning.style.color = "var(--clr-primary-200)";
  itemInputValue.style.borderColor = "var(--clr-primary-200)";
  itemLabel.style.color = "var(--clr-primary-200)";
}

function inputReset(itemWarning, itemInputValue, itemLabel) {
  itemWarning.style.color = "transparent";
  itemInputValue.style.borderColor = "var(--clr-neutral-200)";
  itemLabel.style.color = "var(--clr-neutral-400)";
}

function subDate() {

  if((yValue == 0) || (mValue == 0) || (dValue == 0)) {
    if(dValue == 0) { inputWrongOrEmpty(dWarning, emptyMsg, dInputValue, dLabel) }
    if(mValue == 0) { inputWrongOrEmpty(mWarning, emptyMsg, mInputValue, mLabel) }
    if(yValue == 0) { inputWrongOrEmpty(yWarning, emptyMsg, yInputValue, yLabel) }
    return;
  }

  let d1 = Date.parse(`${yValue}-${mValue}-${dValue}T00:00:00Z`),
      d2 = new Date(),
      days = parseInt((d2 - d1) / 86400000),
      years = 0;
      months = 0;

  if(d2.valueOf() < d1.valueOf()) { 
    yearsOutput.innerHTML = 0;
    monthsOutput.innerHTML = 0;
    daysOutput.innerHTML =0;
    return;
  }

  if(days > 365) {
    years = parseInt(days / 365);
    days = days - (365 * years);
  }
  if(days > 30) {
    months = parseInt(days / 30);
    days = days - (30 * months);
  }
  yearsOutput.innerHTML = years;
  monthsOutput.innerHTML = months;
  daysOutput.innerHTML = days;

  if(days == 1) { dOutputText.innerHTML = " day" } else { dOutputText.innerHTML = " days" }
  if(months == 1) { mOutputText.innerHTML = " month" } else { mOutputText.innerHTML = " months" }
  if(years == 1) { yOutputText.innerHTML = " year" } else { yOutputText.innerHTML = " years" }
}

// day
dInputValue.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^\dA-Z]/g, '');
  dValue = e.target.value;
})

dInputValue.addEventListener("focusout", () => {
  if(dValue.length == 1) {
    dValue = "0" + dValue;
    dInputValue.value = dValue;
  }

  if(dValue == 0) {
    inputWrongOrEmpty(dWarning, emptyMsg, dInputValue, dLabel);
  } else if(dValue > 31) {
    inputWrongOrEmpty(dWarning, dMsg, dInputValue, dLabel);
  } else {
    inputReset(dWarning, dInputValue, dLabel);
  }
})

// month
mInputValue.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^\dA-Z]/g, '');
  mValue = e.target.value;
})

mInputValue.addEventListener("focusout", () => {
  if(mValue.length == 1) {
    mValue = "0" + mValue;
    mInputValue.value = mValue;
  }
  
  if(mValue == 0) {
    inputWrongOrEmpty(mWarning, emptyMsg, mInputValue, mLabel);
  } else if(mValue > 12) {
    inputWrongOrEmpty(mWarning, mMsg, mInputValue, mLabel);
  } else {
    inputReset(mWarning, mInputValue, mLabel);
  }
})

// year
yInputValue.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^\dA-Z]/g, '');
  yValue = e.target.value;
})

yInputValue.addEventListener("focusout", () => {
  if(yValue.length < 4 & yValue != "") {
    yValue = yPattern.substring(0,(4 - yValue.length)) + yValue;
    yInputValue.value = yValue;
  }

  if(yValue == 0) {
    inputWrongOrEmpty(yWarning, emptyMsg, yInputValue, yLabel);
  } else if(yValue > new Date().getFullYear() | yValue == "") {
    inputWrongOrEmpty(yWarning, yMsg, yInputValue, yLabel);
  } else {
    inputReset(yWarning, yInputValue, yLabel);
  }
})