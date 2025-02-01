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
    throw new Error("Missing server details.\n");
  }

  const [ip, port] = ipPort.split(":");
  if (!ip || !port) {
    alert("Invalid IP:Port format!");
    throw new Error("Invalid IP:Port format.\n");
  }

  return { ip, port, password };
}

function logOutput(command, message) {
  const output = document.getElementById("console-window");
  output.value += `> ${command}: ${message}`;
}

async function executeFromFile(filename) {
  try {
    const response = await fetch(`./commands/${filename}.txt`);
    if (response.ok) {
      const data = await response.text();
      const lines = data.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        await executeCommand(line);
      }
    } else {
      console.log(`File ${filename} not found.`);
    }
  } catch (error) {
    console.error(`Error fetching or processing the file: ${error.message}`);
  }
}

async function executeCommand(command) {
  const { ip, port, password } = getServerDetails();
  const data = {
    host: ip,
    port: parseInt(port),
    password: password,
    command: command,
  };

  try {
    const response = await fetch("http://134.122.68.49/rcon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    logOutput(command, result.response || "No output!\n");
    return result.response || "No output!\n";
  } catch (error) {
    console.error("Error:", error);
    logOutput(command, `Error: Unable to connect to the server\n`);
    throw new Error("Unable to connect to the server");
  }
}

function mapClicked(mapName) {
  executeCommand(`map ${mapName};`);
}
