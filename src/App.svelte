<script>
  import RequestPanel from './lib/RequestPanel.svelte';
  import ResponsePanel from './lib/ResponsePanel.svelte';
  
  let response = 'Response will appear here...';
  let isLoading = false;
  
  async function handleRequest(method, url) {
    if (!url) {
      updateResponse('Error: Please enter a URL');
      return;
    }

    isLoading = true;
    updateResponse('Sending request...');
    
    try {
      const result = await window.electronAPI.sendRequest(method, url);
      updateResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      updateResponse(`Error: ${error.message}`);
    } finally {
      isLoading = false;
    }
  }
  
  function updateResponse(text) {
    response = text;
  }
</script>

<main>
  <div class="container">
    <h1>Re-Quest-Er</h1>
    <RequestPanel on:send-request="{e => handleRequest(e.detail.method, e.detail.url)}" {isLoading} />
    <ResponsePanel {response} />
  </div>
</main>

<style>
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  h1 {
    color: #333;
    margin-top: 0;
  }
</style>
