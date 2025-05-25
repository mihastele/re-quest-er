<script>
  import { createEventDispatcher } from 'svelte';
  
  export let isLoading = false;
  
  const dispatch = createEventDispatcher();
  
  let method = 'GET';
  let url = 'https://httpbin.org/get';
  
  function handleSubmit() {
    dispatch('send-request', { method, url });
  }
  
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }
</script>

<div class="request-controls">
  <select bind:value={method}>
    <option value="GET">GET</option>
    <option value="POST">POST</option>
    <option value="PUT">PUT</option>
    <option value="DELETE">DELETE</option>
  </select>
  
  <input 
    type="text" 
    bind:value={url} 
    placeholder="Enter URL"
    on:keypress={handleKeyPress}
    disabled={isLoading}
  >
  
  <button on:click={handleSubmit} disabled={isLoading}>
    {#if isLoading}
      Sending...
    {:else}
      Send
    {/if}
  </button>
</div>

<style>
  .request-controls {
    display: flex;
    margin-bottom: 20px;
    gap: 10px;
  }
  
  select, input, button {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  input {
    flex-grow: 1;
    min-width: 200px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    min-width: 80px;
  }
  
  button:hover:not(:disabled) {
    background-color: #45a049;
  }
  
  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
</style>
