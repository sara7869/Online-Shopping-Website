// check if user inputs are valid and if so, show summary
function validAndSummary() {

    document.getElementById("warningName").innerHTML = "";
    document.getElementById("warningEmail").innerHTML = "";
    document.getElementById("warningQueryTheme").innerHTML = "";
    document.getElementById("warningQueryDetails").innerHTML = "";

    if (checkValid() == true) {
        createSummary();
        document.getElementById("queryform").style.display = "none";
        document.getElementById("summaryView").style.display = "block";
    }
    else {
        alert("The query form hasn't been filled correctly. Please recheck.")
    }
}

//shows form with data filled in
function edit() {
    document.getElementById("queryform").style.display = "block";
    document.getElementById("summaryView").style.display = "none";
}

//sends data by email
function send() {
    let subject = "Query";
    let yourMessage = "";
    yourMessage = "Name: " + document.queryform.elements[1].value +
        "\n Email: " + document.queryform.elements[2].value +
        "\n Query Theme: " + getRadioValue(document.getElementsByName("queryTheme")) +
        "\n Query Details: " + document.getElementById("queryDetails").value;
    document.location.href = "mailto:sarayusri17@gmail.com?subject="
        + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(yourMessage);
    alert("Your query is ready to be emailed.")
}

//gets the radio option selecred
function getRadioValue(radioArray) {
    let i;
    for (i = 0; i < radioArray.length; i++) {
        if (radioArray[i].checked) {
            return radioArray[i].value;
        }
    }
    return "";
}

//checks if input values in form are valid
function checkValid() {

    let alertMsg = "";
    let nameValid = true;
    let emailValid = true;
    let queryThemeValid = true;
    let queryDetailsValid = true;
    let name;
    let email;

    name = document.queryform.elements[1].value;
    email = document.queryform.elements[2].value;

    if (name == "") {
        alertMsg = "* Required";
        document.getElementById("warningName").innerHTML = alertMsg;
        nameValid = false;
    }
    else if (!isNaN(name)) {
        alertMsg = "* Invalid. Please enter a valid name.";
        document.getElementById("warningName").innerHTML = alertMsg;
        nameValid = false;
    }

    if (email == "") {
        alertMsg = "* Required";
        document.getElementById("warningEmail").innerHTML = alertMsg;
        emailValid = false;
    }
    else if (!isNaN(email) || !email.includes("@") || !email.includes(".com")) {
        alertMsg = "* Invalid. Please enter a valid email.";
        document.getElementById("warningEmail").innerHTML = alertMsg;
        emailValid = false;
    }

    if (getRadioValue(document.getElementsByName("queryTheme")) == "") {
        alertMsg = "* Required";
        document.getElementById("warningQueryTheme").innerHTML = alertMsg;
        queryThemeValid = false;
    }
    if (document.getElementById("queryDetails").value == "") {
        alertMsg = "* Required";
        document.getElementById("warningQueryDetails").innerHTML = alertMsg;
        queryDetailsValid = false;
    }

    if (nameValid == true && emailValid == true && queryThemeValid == true && queryDetailsValid == true) {
        return true;
    }
}

//displays summary
function createSummary() {
    document.getElementById("nameSpan").innerHTML = document.queryform.elements[1].value;
    document.getElementById("emailSpan").innerHTML = document.queryform.elements[2].value;
    document.getElementById("queryThemeSpan").innerHTML = getRadioValue(document.getElementsByName("queryTheme"));
    document.getElementById("queryDetailsSpan").innerHTML = document.getElementById("queryDetails").value;
}

document.getElementById("viewQuery").addEventListener("click", validAndSummary);
document.getElementById("editButton").addEventListener("click", edit);
document.getElementById("sendButton").addEventListener("click", send);