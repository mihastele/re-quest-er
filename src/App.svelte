<script>
  import { onMount } from 'svelte';
  import { request } from './utils/request.js';

  let url = '';
  let method = 'GET';
  let body = '';
  let response = null;
  let responseView = 'web';
  let statusCode = null;
  let queryParams = [];
  let pathParams = [];
  let formData = [];

  onMount(() => {
    // Initialize queryParams, pathParams, and formData with empty values or load from storage if needed
  });

  async function sendRequest() {
    try {
      const result = await request(url, method, body, queryParams, pathParams, formData);
      response = result.response;
      statusCode = result.status;
    } catch (error) {
      response = { error: true, message: error.message };
      statusCode = null;
    }
  }

  function addQueryParam() {
    queryParams = [...queryParams, { key: '', value: '' }];
  }

  function removeQueryParam(index) {
    queryParams = queryParams.filter((_, i) => i !== index);
  }

  function addPathParam() {
    pathParams = [...pathParams, { key: '', value: '' }];
  }

  function removePathParam(index) {
    pathParams = pathParams.filter((_, i) => i !== index);
  }

  function addFormData() {
    formData = [...formData, { key: '', value: '' }];
  }

  function removeFormData(index) {
    formData = formData.filter((_, i) => i !== index);
  }

  function getStatusColor(code) {
    if (code >= 200 && code < 300) return 'green';
    if (code >= 400) return 'red';
    return 'black';
  }
</script>

<div class="container">
  <div class="request-section">
    <select bind:value={method}>
      <option value="GET">GET</option>
      <option value="POST">POST</option>
      <option value="PUT">PUT</option>
      <option value="DELETE">DELETE</option>
    </select>
    <input type="text" bind:value={url} placeholder="Enter URL" />
    <button on:click={sendRequest}>Send</button>
  </div>

  <div class="params-section">
    <h3>Query Parameters</h3>
    {#each queryParams as param, index}
      <div class="param-row">
        <input type="text" bind:value={param.key} placeholder="Key" />
        <input type="text" bind:value={param.value} placeholder="Value" />
        <button on:click={() => removeQueryParam(index)}>Remove</button>
      </div>
    {/each}
    <button on:click={addQueryParam}>Add Query Parameter</button>

    <h3>Path Parameters</h3>
    {#each pathParams as param, index}
      <div class="param-row">
        <input type="text" bind:value={param.key} placeholder="Key" />
        <input type="text" bind:value={param.value} placeholder="Value" />
        <button on:click={() => removePathParam(index)}>Remove</button>
      </div>
    {/each}
    <button on:click={addPathParam}>Add Path Parameter</button>
  </div>

  <div class="body-section">
    <h3>Body</h3>
    <textarea bind:value={body} placeholder="Enter request body"></textarea>
    <h3>Form Data (URL Encoded)</h3>
    {#each formData as data, index}
      <div class="param-row">
        <input type="text" bind:value={data.key} placeholder="Key" />
        <input type="text" bind:value={data.value} placeholder="Value" />
        <button on:click={() => removeFormData(index)}>Remove</button>
      </div>
    {/each}
    <button on:click={addFormData}>Add Form Data</button>
  </div>

  <div class="response-section">
    <h3>Response {#if statusCode}<span style="color: {getStatusColor(statusCode)}">{statusCode}</span>{/if}</h3>
    <div class="view-selector">
      <button on:click={() => responseView = 'web'} class:active={responseView === 'web'}>Web View</button>
      <button on:click={() => responseView = 'html'} class:active={responseView === 'html'}>HTML</button>
      <button on:click={() => responseView = 'pretty'} class:active={responseView === 'pretty'}>Pretty HTML</button>
    </div>
    {#if response}
      {#if response.error}
        <p>Error: {response.message}</p>
      {:else}
        {#if responseView === 'web'}
          <iframe srcdoc={response.html} title="Web View" />
        {:else if responseView === 'html'}
          <pre>{response.html}</pre>
        {:else}
          <pre>{response.prettyHtml}</pre>
        {/if}
      {/if}
    {/if}
  </div>
</div>

<style>
  .container {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  .request-section {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .request-section input {
    flex-grow: 1;
    padding: 5px;
  }
  .params-section, .body-section, .response-section {
    margin-bottom: 20px;
  }
  .param-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  .param-row input {
    flex-grow: 1;
    padding: 5px;
  }
  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }
  .view-selector {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  .view-selector button.active {
    background-color: #007bff;
    color: white;
  }
  iframe {
    width: 100%;
    height: 300px;
    border: 1px solid #ccc;
  }
  pre {
    background-color: #f8f8f8;
    padding: 10px;
    overflow-x: auto;
  }
</style>
