<script>
  let { data } = $props();
</script>

<form action="/discover" method="GET">
  <div style="padding: 20px">
    <div class="container" style="width: 80%;">
      <div class="row">
        <div class="col-11">
          <input
            class="form-control"
            id="search"
            name="search"
            type="text"
            placeholder="Search"
            value={data.search}
          />
        </div>
        <div class="col-1">
          <button class="btn btn-primary" type="submit">Search</button>
        </div>
      </div>
    </div>
  </div>
</form>
{#if (data.results.data.length != 0)}
<h1>Showing results for {data.search}</h1>
{:else if (data.search == null)||(data.search=="")}
{:else}
<h1>No results found for {data.search}</h1>
{/if}


{#each data.results.data as item}
  <div style="padding: 0.5rem;justify-content: center;align-items: center;display:flex">
    <div class="card" style="width: 90%; height: 5%; padding: 1rem; border-radius: 3rem;">
      <div class="container">
        <div class="row">
          <div class="col-sm d-flex justify-content-center align-items-center" style="width:auto">
            <img
              src={`https://www.kroger.com/product/images/large/front/${item.upc}`}
              class="card-img-top"
              alt="item picture"
              style="height: auto;width:45%"
            />
          </div>
          <div class="col-sm">
            <div class="card-body">
              <h5 class="card-title">{item.description}</h5>
              <p class="card-text">UPC: {item.upc}</p>
              <p class="card-text">Brand: {item.brand}</p>
              <a class="btn btn-primary">Add To List</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/each}