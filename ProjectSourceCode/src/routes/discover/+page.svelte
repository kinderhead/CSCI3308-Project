<script lang="ts">
  import { getList, addItem, removeItem } from '#lib/list.remote.js';
  let { data } = $props();
  let listOfItems = $state(await getList(data.id!));

  async function updateList() {
    await getList(data.id!).refresh();
    listOfItems = await getList(data.id!);
  }

  async function callAddItem(jsonion: { id: string; name: string; kroger?: string | undefined; }) {
    await updateList();
    if (!(await itemExists(jsonion.kroger!))){
      await addItem(jsonion); 
    }
    await updateList();
  }

  async function itemExists(kroger: string){
    return listOfItems.some(anItem => anItem.kroger_id===kroger);
  }

  async function callRemoveItem(kroger: string) {
    await updateList();
    if(await itemExists(kroger)){
      const listItemID = listOfItems.find((anItem) => anItem.kroger_id === kroger)!.id;
      await removeItem({list_id: data.id!, id: listItemID});
    }
    await updateList();
  }

</script>

<!-- SEARCH BAR --> 
<form action="/discover" method="GET" data-sveltekit-reload>
  <div style="padding: 20px">
    <div class="container" style="width: 80%;">
      <div class="row">
        <div class="col-11">
          <input
            type="hidden"
            id="id"
            name="id"
            value={data.id}
          />
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

  <!-- variable declaration for when data is being added to list -->
  {let loading = $state(false);}

  <div style="justify-content: center;align-items: center;display:flex;">
    <div class="card shadow-sm p-6 mb-7 bg-white rounded " style="width: 90%; height: 5%; padding: 1rem; border-radius: 3rem;">
      <div class="container">
        <div class="row" style="justify-content: center; align-items: center; display:flex">
          <!--  column div for item picture   -->
          <div class="col-md-auto d-flex justify-content-center align-items-center" style="width:auto;">
            <img
              src={`https://www.kroger.com/product/images/large/front/${item.upc}`}
              class="card-img-top"
              alt="item"
              style="height:auto;width:175px"
            />
          </div>

          <!--   column div for item name and upc  -->
          <div class="col-md">
            <div class="card-body">
              <h6 class="card-title">{item.description}</h6>
              <p class="card-text">UPC: {item.upc}</p>
              <p class="card-text">Brand: {item.brand}</p>

              <!-- fun little script that shows "updating list" when item is being processed in <script> tag -->

              {#if loading}
                <button
                  type="button"
                  class="btn btn-secondary disabled"
                >Updating List...</button>
              {:else}

                <!-- will either say "Add to List" if item doesn't exist in list yet or "Remove from List" if it does -->

                {#if !listOfItems.some(anItem => anItem.kroger_id===item.upc)}
                  <button

                    type="button"
                    class="btn btn-primary"
                    
                    // will declare if that item is loading while running callAddItem()

                    onclick={ async () => {
                      loading = true;
                      await callAddItem({
                        id: data.id!,
                        name: item.description,
                        kroger: item.upc
                      })

                      loading = false;

                    }}
                  >
                    Add To List
                  </button>

                {:else}

                  <button

                    type="button"
                    class="btn btn-danger"

                    // will declare if that item is loading while running callRemoveItem()

                    onclick={async () =>{
                      loading = true;
                      await callRemoveItem(item.upc)
                      loading = false;
                      }
                    }

                  >
                    Remove from List
                  </button>
                {/if}
              {/if}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
{/each}