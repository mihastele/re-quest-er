const { exec } = require('child_process');

document.getElementById('request-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const url = document.getElementById('url').value;
    const method = document.getElementById('method').value;
    const body = method === 'POST' || method === 'PUT' ? document.getElementById('request-body').value : '';
    let curlCommand = `curl -X ${method} "${url}"`;
    if (body) {
        curlCommand += ` -H "Content-Type: application/json" -d '${body}'`;
    }
    exec(curlCommand, (error, stdout, stderr) => {
        if (error) {
            document.getElementById('response-output').textContent = `Error: ${error.message}`;
            return;
        }
        if (stderr) {
            document.getElementById('response-output').textContent = `Stderr: ${stderr}`;
            return;
        }
        document.getElementById('response-output').textContent = stdout;
    });
});
