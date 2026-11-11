<script>
  let { data } = $props();
  function listAdd( jsonion ){
    console.log(jsonion);
    return jsonion;
  }
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
          <button class="btn btn-secondary" type="submit">Search</button>
        </div>
      </div>
    </div>
  </div>
</form>
{#if (data.results.data.length != 0)}
<h4 style="padding-left:10%">Showing results for {data.search}</h4>
{:else if (data.search == null)||(data.search=="")}
{:else}
<h4 style="padding-left:10%; padding-right:10%">No results found for {data.search}</h4>
{/if}


{#each data.results.data as item}
  <div style="padding: 0.5rem;justify-content: center;align-items: center;display:flex">
    <div class="card shadow-sm p-6 mb-7 bg-white rounded " style="width: 90%; height: 5%; padding: 1rem; border-radius: 3rem;">
      <div class="container">
        <div class="row" style="justify-content: center; align-items: center; display:flex">
          <div class="col-md-auto d-flex justify-content-center align-items-center" style="width:auto;">
            <img
              src={`https://www.kroger.com/product/images/large/front/${item.upc}`}
              class="card-img-top"
              alt="item picture"
              style="height: 250px;width:auto"
            />
          </div>
          <div class="col-md">
            <div class="card-body">
              <h5 class="card-title">{item.description}</h5>
              <p class="card-text">UPC: {item.upc}</p>
              <p class="card-text">Brand: {item.brand}</p>
              <form action="/listAdd" method="POST">
                <a class="btn btn-primary" onclick={listAdd({
                  itemName:item.description,
                  id:item.upc
                })
                }>Add To List</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/each}