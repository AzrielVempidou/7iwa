<template>
  <div class="flex flex-col mx-auto w-1/5 justify-center text-center h-96 min-h-[500px] max-h-[800px]">
    <form id="login-form" @submit.prevent="handleLogin(formLogin)">
      <div class="space-y-4">
        <header class="mb-3 text-2xl font-bold">Log in</header>
        <div class="group inline-block">
          <button class="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
            <span class="pr-1 font-semibold flex-1">Dropdown</span>
            <span>
              <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
          </button>
          <ul class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32">
            <li class="rounded-sm px-3 py-1 hover:bg-gray-100">Programming</li>
            <li class="rounded-sm px-3 py-1 hover:bg-gray-100">DevOps</li>
            <li class="rounded-sm relative px-3 py-1 hover:bg-gray-100">
              <button class="w-full text-left flex items-center outline-none focus:outline-none">
                <span class="pr-1 flex-1">Langauges</span>
                <span class="mr-auto">
                  <svg class="fill-current h-4 w-4
            transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </button>
              <ul class="bg-white border rounded-sm absolute top-0 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  ">
                <li class="px-3 py-1 hover:bg-gray-100">Javascript</li>
                <li class="rounded-sm relative px-3 py-1 hover:bg-gray-100">
                  <button class="w-full text-left flex items-center outline-none focus:outline-none">
                    <span class="pr-1 flex-1">Python</span>
                    <span class="mr-auto">
                      <svg class="fill-current h-4 w-4
                transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                  </button>
                  <ul class="bg-white border rounded-sm absolute top-0 right-0 
      transition duration-150 ease-in-out origin-top-left
      min-w-32
      ">
                    <li class="px-3 py-1 hover:bg-gray-100">2.7</li>
                    <li class="px-3 py-1 hover:bg-gray-100">3+</li>
                  </ul>
                </li>
                <li class="px-3 py-1 hover:bg-gray-100">Go</li>
                <li class="px-3 py-1 hover:bg-gray-100">Rust</li>
              </ul>
            </li>
            <li class="rounded-sm px-3 py-1 hover:bg-gray-100">Testing</li>
          </ul>
        </div>

        <div
          class="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input  type="number" 
            class="my-3 w-full border-none bg-transparent outline-none" 
            id="counselorIdInput"
            />
        </div>
        <div
          class="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input  type="number" placeholder="rating"
            class="my-3 w-full border-none bg-transparent outline-none" />
        </div>
        <button type="submit"
          class="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  // Ambil nilai "counselorId" dari localStorage
  var counselorId = localStorage.getItem('counselorId');

  // Temukan elemen input dengan ID 'counselorIdInput' dan isi dengan nilai dari localStorage
  var counselorIdInput = document.getElementById('counselorIdInput');
  if (counselorIdInput && counselorId !== null) {
    counselorIdInput.value = counselorId;
  }
export default {

}
</script>
