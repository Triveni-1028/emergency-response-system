const emergencyAPI = "http://localhost:3001";
const ambulanceAPI = "http://localhost:3002";
const hospitalAPI = "http://localhost:3003";
const notificationAPI = "http://localhost:3004";


// ================= VIEW RECORDS =================

async function loadEmergencies() {
    const res = await fetch(emergencyAPI + "/emergencies");
    const data = await res.json();

    document.getElementById("emergencyCount").innerText =
        data.length + " Records";

    showTable("Emergency Records", data);
}


async function loadAmbulances() {
    const res = await fetch(ambulanceAPI + "/ambulances");
    const data = await res.json();

    document.getElementById("ambulanceCount").innerText =
        data.length + " Records";

    showTable("Ambulance Records", data);
}


async function loadHospitals() {
    const res = await fetch(hospitalAPI + "/hospitals");
    const data = await res.json();

    document.getElementById("hospitalCount").innerText =
        data.length + " Records";

    showTable("Hospital Records", data);
}


async function loadNotifications() {
    const res = await fetch(notificationAPI + "/notifications");
    const data = await res.json();

    document.getElementById("notificationCount").innerText =
        data.length + " Records";

    showTable("Notification Records", data);
}


// ================= ADD EMERGENCY =================

async function addEmergency() {

    let type = document.getElementById("emergencyType").value;
    let location = document.getElementById("emergencyLocation").value;
    let status = document.getElementById("emergencyStatus").value;

    if (!type || !location) {
        alert("Please fill emergency details");
        return;
    }

    try {
        let res = await fetch(emergencyAPI + "/emergencies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: type,
                location: location,
                status: status
            })
        });

        let data = await res.json();

        alert(data.message);

        document.getElementById("emergencyType").value = "";
        document.getElementById("emergencyLocation").value = "";

        loadEmergencies();

    } catch (error) {
        alert("Error adding emergency");
    }
}


// ================= ADD AMBULANCE =================

async function addAmbulance() {

    let vehicle = document.getElementById("vehicleNumber").value;
    let driver = document.getElementById("driver").value;
    let status = document.getElementById("ambulanceStatus").value;

    if (!vehicle || !driver) {
        alert("Please fill ambulance details");
        return;
    }

    try {
        let res = await fetch(ambulanceAPI + "/ambulances", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                vehicleNumber: vehicle,
                driver: driver,
                status: status
            })
        });

        let data = await res.json();

        alert(data.message);

        document.getElementById("vehicleNumber").value = "";
        document.getElementById("driver").value = "";

        loadAmbulances();

    } catch (error) {
        alert("Error adding ambulance");
    }
}


// ================= ADD HOSPITAL =================

async function addHospital() {

    let name = document.getElementById("hospitalName").value;
    let location = document.getElementById("hospitalLocation").value;
    let beds = document.getElementById("availableBeds").value;
    let emergency = document.getElementById("emergencyAvailable").value;

    if (!name || !location || !beds) {
        alert("Please fill hospital details");
        return;
    }

    try {
        let res = await fetch(hospitalAPI + "/hospitals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                location: location,
                availableBeds: Number(beds),
                emergencyAvailable: Number(emergency)
            })
        });

        let data = await res.json();

        alert(data.message);

        document.getElementById("hospitalName").value = "";
        document.getElementById("hospitalLocation").value = "";
        document.getElementById("availableBeds").value = "";

        loadHospitals();

    } catch (error) {
        alert("Error adding hospital");
    }
}


// ================= ADD NOTIFICATION =================

async function addNotification() {

    let message = document.getElementById("notificationMessage").value;
    let status = document.getElementById("notificationStatus").value;

    if (!message) {
        alert("Please enter notification");
        return;
    }

    try {
        let res = await fetch(notificationAPI + "/notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                status: status
            })
        });

        let data = await res.json();

        alert(data.message);

        document.getElementById("notificationMessage").value = "";

        loadNotifications();

    } catch (error) {
        alert("Error adding notification");
    }
}


// ================= EMERGENCY ACTIONS =================

async function requestAmbulance() {

    try {
        let res = await fetch(emergencyAPI + "/request-ambulance");
        let data = await res.json();

        if (data.ambulance) {
            showDetails("🚑 Ambulance Found", [
                ["Vehicle", data.ambulance.vehicleNumber],
                ["Driver", data.ambulance.driver],
                ["Status", data.ambulance.status]
            ]);
        } else {
            showMessage(data.message);
        }

    } catch (error) {
        showMessage("Error finding ambulance");
    }
}


async function findHospital() {

    try {
        let res = await fetch(ambulanceAPI + "/find-hospital");
        let data = await res.json();

        if (data.hospital) {
            showDetails("🏥 Hospital Found", [
                ["Name", data.hospital.name],
                ["Location", data.hospital.location],
                ["Beds", data.hospital.availableBeds],
                ["Emergency", data.hospital.emergencyAvailable == 1 ? "Yes" : "No"]
            ]);
        } else {
            showMessage(data.message);
        }

    } catch (error) {
        showMessage("Error finding hospital");
    }
}


async function sendNotification() {

    try {
        let res = await fetch(hospitalAPI + "/notify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Emergency patient arriving"
            })
        });

        let data = await res.json();

        showMessage(data.message || "Notification sent successfully");

        loadNotifications();

    } catch (error) {
        showMessage("Error sending notification");
    }
}


// ================= SYSTEM RESPONSE =================

function showTable(title, data) {

    let html = "<h3>" + title + "</h3>";

    if (data.length == 0) {
        html += "<p>No records found</p>";
    } else {

        html += "<table><tr>";

        Object.keys(data[0]).forEach(function(key) {
            html += "<th>" + key + "</th>";
        });

        html += "</tr>";

        data.forEach(function(row) {

            html += "<tr>";

            Object.keys(data[0]).forEach(function(key) {
                html += "<td>" + row[key] + "</td>";
            });

            html += "</tr>";
        });

        html += "</table>";
    }

    document.getElementById("result").innerHTML = html;
}


function showDetails(title, details) {

    let html = "<h3>" + title + "</h3>";

    details.forEach(function(item) {
        html += "<p><b>" + item[0] + ":</b> " + item[1] + "</p>";
    });

    document.getElementById("result").innerHTML = html;
}


function showMessage(message) {

    document.getElementById("result").innerHTML =
        "<p>" + message + "</p>";
}


// ================= SEARCH =================

function searchActions() {

    let text = document.getElementById("actionSearch").value.toLowerCase();

    let buttons = document.querySelectorAll("#actionButtons button");

    buttons.forEach(function(button) {

        if (button.innerText.toLowerCase().includes(text)) {
            button.style.display = "inline-block";
        } else {
            button.style.display = "none";
        }

    });
}


// ================= START =================

window.onload = function() {

    loadEmergencies();
    loadAmbulances();
    loadHospitals();
    loadNotifications();

};