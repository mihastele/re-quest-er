import { ipcRenderer } from 'electron';
import { exec } from 'child_process';

document.getElementById('send').addEventListener('click', () => {
    const method = document.getElementById('method').value;
    const url = document.getElementById('url').value;
    
    if (!url) {
        updateResponse('Error: Please enter a URL');
        return;
    }

    updateResponse('Sending request...');
    
    // Build the curl command
    let curlCommand = `curl -X ${method} "${url}"`;
    
    // Add headers for JSON response
    curlCommand += ' -H "Accept: application/json"';
    
    // Execute the curl command
    exec(curlCommand, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
            updateResponse(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            updateResponse(`Error: ${stderr}`);
            return;
        }
        try {
            // Try to pretty-print JSON if the response is JSON
            const json = JSON.parse(stdout);
            updateResponse(JSON.stringify(json, null, 2));
        } catch (e) {
            // If not JSON, display as plain text
            updateResponse(stdout || 'No response body');
        }
    });
});

function updateResponse(text) {
    document.getElementById('response').textContent = text;
}

// Handle Enter key in URL input
document.getElementById('url').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('send').click();
    }
});
