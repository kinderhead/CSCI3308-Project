<script lang=ts>
  let { data } = $props();
  function callListAdd(jsonion : {} ){
    console.log(jsonion);
    return undefined;
  }
</script>

<!-- SEARCH BAR --> 
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
          <input
            type="hidden"
            id="id"
            name="id"
            value={data.id}
          />
        </div>
        <div class="col-1">
          <button class="btn btn-primary" type="submit">Search</button>
        </div>
      </div>
    </div>
  </div>
</form>


<!--   "Showing result(s) for {search} / No results found for {search}" block   -->
{#if (data.results.data.length != 0)}

<!--  conditionally renders number of items, if an item is found or if 1 item is found  -->
<h4 style="padding-left:10%; padding-right:10%; padding-bottom: 10px;">Showing {data.results.data.length} result{#if (data.results.data.length !=1)}s{/if}
   for {data.search}</h4>

<!--   if /discover is called without a search query or search="" render nothing-->
{:else if (data.search == null)||(data.search=="")}

<!--   otherwise display no results for    -->
{:else}
<h4 style="padding-left:10%; padding-right:10%">No results found for {data.search}</h4>
{/if}


<!--  Dynamic display of items returned by Kroger API   -->
{#each data.results.data as item}
  <div style="justify-content: center;align-items: center;display:flex;">
    <div class="card shadow-sm p-6 mb-7 bg-white rounded " style="width: 90%; height: 5%; padding: 1rem; border-radius: 3rem;">
      <div class="container">
        <div class="row" style="justify-content: center; align-items: center; display:flex">
          <!--  column div for item picture   -->
          <div class="col-md-auto d-flex justify-content-center align-items-center" style="width:auto;">
            <img
              src={`https://www.kroger.com/product/images/large/front/${item.upc}`}
              class="card-img-top"
              alt="item picture"
              style="height:auto;width:175px"
            />
          </div>

          <!--   column div for item name and upc  -->
          <div class="col-md">
            <div class="card-body">
              <h6 class="card-title">{item.description}</h6>
              <p class="card-text">UPC: {item.upc}</p>
              <p class="card-text">Brand: {item.brand}</p>

              <form action="/listAdd" method="POST">


                {#if true}
                <a class="btn btn-primary" onclick={() => listAdd({
                  item:item.description,
                  kroger_id:item.upc
                })
                }>
                Add To List</a>
                {:else}

                {/if}



              </form>
  
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
{/each}