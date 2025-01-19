let ipPort = "";
let password = "";

function saveSetup() {
  ipPort = document.getElementById("ip-port").value;
  password = document.getElementById("password").value;
  alert("Server details saved!");
}

function getServerDetails() {
  if (!ipPort || !password) {
    alert("Please fill in the IP:Port and Password!");
    throw new Error("Missing server details.");
  }

  const [ip, port] = ipPort.split(":");
  if (!ip || !port) {
    alert("Invalid IP:Port format!");
    throw new Error("Invalid IP:Port format.");
  }

  return { ip, port, password };
}

async function logOutput(command) {
  const output = document.getElementById("console-window");
  try {
    const response = await executeCommand(command);
    output.value += `> ${command}: ${response}`;
  } catch (error) {
    output.value += `> ${command}: Error: ${error.message}`;
  }
}

function executeCommand(command) {
  const { ip, port, password } = getServerDetails();
  const data = {
    host: ip,
    port: parseInt(port),
    password: password,
    command: command,
  };

  return fetch("http://134.122.68.49/rcon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.response || "No output!\n";
    })
    .catch((error) => {
      console.error("Error:", error);
      return "Error: Unable to connect to the server";
    });
}
