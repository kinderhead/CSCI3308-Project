<script lang="ts">
  import { addItem, getList, removeItem } from '#lib/list.remote.js';
    import { goto } from '$app/navigation';
  let { data } = $props();
  // svelte-ignore state_referenced_locally
  let listOfItems = $state(await getList(data.id!));

  //  makes a call to getList of listID and stores it in listOfItems

  async function updateList() {
    await getList(data.id!).refresh();
    listOfItems = await getList(data.id!);
  }


  async function callAddItem(jsonion: { id: string; name: string; kroger: string; }) {
    await updateList();
    if (!(await itemExists(jsonion.kroger!))){
      await addItem(jsonion); 
    }
    await updateList();
  }

  // checks if an item exists within listOfItems based on UPC and returns bool

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
      <div class="row" style="left-right-padding:10%">
        <div class="col-11" style="width: 80%">
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
        <div class="col-1 flex gap-2">
          <button class="btn btn-primary" type="submit">Search</button>
          <button class="btn btn-secondary" onclick={async (e) => {
            e.preventDefault();
            await goto(`/home?id=${data.id}`);
          }}>Return</button>
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

  <!-- per-cell dynamic variables -->
  {let loading: boolean = $state(false);}
  {let error: boolean = $state(false);}
  {let erMsg: String = $state('');}

  <div style="justify-content: center;align-items: center;display:flex;">
    <div class="card shadow-sm p-6 mb-3 bg-white rounded " style="width: 90%; height: 5%; padding: .5rem; border-radius: 5rem;">
      <div class="container">
        <div class="row" style="justify-content: center; align-items: center; display:flex;" >
          <!--  column div for item picture   -->
          <div class="col-md-auto d-flex justify-content-center align-items-center" style="width:175px;">
            <img
              src={`https://www.kroger.com/product/images/large/front/${item.upc}`}
              class="card-img-top"
              alt="item"
              style="max-height:175px;max-width:175px;object-fit:contain"
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
                      try{
                        await callAddItem({
                          id: data.id!,
                          name: item.description,
                          kroger: item.upc
                        })
                        error = false;
                      }
                      catch(e: any){
                        error = true;
                        erMsg = e.status;
                      }
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
                      try{
                        await callRemoveItem(item.upc)
                        error = false;
                      }
                      catch(e: any){
                        error = true;
                        erMsg = e.status;
                      }
                      loading = false;
                      }
                    }

                  >
                    Remove from List
                  </button>
                {/if}
              {/if}
              {#if error}
              <p style="color:red">Action failed! Status: {erMsg}</p>
              {/if}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
{/each}
<div style="padding:30px"></div>