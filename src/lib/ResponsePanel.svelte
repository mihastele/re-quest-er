<script>
  export let response = '';
</script>

<div class="response-container">
  <h3>Response</h3>
  <pre class="response-content">{response}</pre>
</div>

<style>
  .response-container {
    margin-top: 20px;
  }
  
  h3 {
    margin: 0 0 10px 0;
    color: #333;
  }
  
  .response-content {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fafafa;
    white-space: pre-wrap;
    font-family: monospace;
    min-height: 100px;
    max-height: 500px;
    overflow-y: auto;
    margin: 0;
  }
</style>
