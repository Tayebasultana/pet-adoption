
// make connection between view button to adopt section
const viewMoreButton = document.getElementById("viewMoreButton");     
const adoptSection = document.getElementById("adoptSection");

viewMoreButton.addEventListener("click", function() {
adoptSection.scrollIntoView({ behavior: "smooth" });
});


//1- fetch, load and show catagories in html

// create loadCategories
const loadCategories = () => {
    // fetch the data
   fetch("https://openapi.programming-hero.com/api/peddy/categories")
   .then((res) => res.json())
   .then((data) => displayCategories(data.categories))
   .catch((error) => console.log(error))
}

// create loadPets
const loadPets = () => {
  // fetch the data
 fetch("https://openapi.programming-hero.com/api/peddy/pets")
 .then((res) => res.json())
 .then((data) => displayPets(data.pets))
 .catch((error) => console.log(error))
}

// load details
const loadDetails = async (petId) => {
  console.log(petId);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.petData);
}

// load categories video
const loadCategoriesVideos = (categoryName) => {

fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
 .then((res) => res.json())
 .then((data) => displayPets(data.data))
 .catch((error) => console.log(error))
}

const displayDetails = (pet) => {
  console.log(pet);
  const detailContainer = document.getElementById("modal-contant")
// make modal contant here
detailContainer.innerHTML=
`
<div class="card border-2 rounded-xl ">
  <figure class="h-[220px] px-5 pt-5">
    <img
      src=${pet.image}
      alt="Shoes"
      class="h-full w-full object-cover rounded-xl" />
  </figure>
  <div class="card-body">
    <h2 class="font-bold text-2xl ">${pet.pet_name}</h2>
    <div class="grid grid-cols-2">
    <p><i class="fas fa-paw"></i>  <strong>Breed : </strong>${pet.breed}</p>
    <p><i class="fa-solid fa-calendar-days fa-sm"></i>  <strong>Birth : </strong>${pet.date_of_birth}</p>
    <p> <i class="fas ${pet.gender === 'Male' ? 'fa-mars' : 'fa-venus'}"></i>  <strong>Gender : </strong>${pet.gender}</p>
    <p><i class="fa-solid fa-circle-dollar-to-slot fa-sm"></i>  <strong>Price : </strong>${pet.price}</p>
    </div>

    <div class="divider"></div>

    <div>
    <h2><strong>Details Information : </strong>${pet.pet_details}</h2>
    </div>
`
  document.getElementById("my_modal_5").showModal();
}


const displayPets = (pets) => {
const allPetContainer = document.getElementById("adoptPet");

allPetContainer.innerHTML = '';

if(pets.length === 0){
  // remove grid
  allPetContainer.classList.remove("grid");
  // if there is no data available show this 
  allPetContainer.innerHTML = `
  <div class="bg-gray-200 rounded-xl text-center sm:px-0 gap-0 md md:px-10 lg:px-10 py-7">
   <img src="images/error.webp" alt="" class="mx-auto w-100%">
   <h2 class="text-black font-bold text-2xl sm:my-2 md:my-4 lg:my-4">No Information Available</h2>
   <p class="sm:w-auto md:w-auto lg:w-6/12 mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
      its layout. The point of using Lorem Ipsum is that it has a.</p>
  </div>
  `;
  return;
}
else{
  // add grid
  allPetContainer.classList.add("grid");
}

pets.forEach((pet) => {
  console.log(pet);
  const card = document.createElement("div");
  // card for all pets
  card.innerHTML=
  `
  <div class="card border-2 rounded-xl w-80">
  <figure class="h-[220px] px-5 pt-5">
    <img
      src=${pet.image}
      alt="Shoes"
      class="h-full w-full object-cover rounded-xl" />
  </figure>
  <div class="card-body">
    <h2 class="font-bold text-2xl ">${pet.pet_name}</h2>
    <p><i class="fas fa-paw"></i>  <strong>Breed : </strong>${pet.breed}</p>
    <p><i class="fa-solid fa-calendar-days fa-sm"></i>  <strong>Birth : </strong>${pet.date_of_birth}</p>
    <p> <i class="fas ${pet.gender === 'Male' ? 'fa-mars' : 'fa-venus'}"></i>  <strong>Gender : </strong>${pet.gender}</p>
    <p><i class="fa-solid fa-circle-dollar-to-slot fa-sm"></i>  <strong>Price : </strong>${pet.price}</p>

    <div class="divider"></div>
    
    <div class="card-actions justify-between">
    <button class="like-btn btn btn-primary text-lg font-bold text-teal-600 bg-transparent border-violet-400 hover:bg-teal-600 hover:text-white hover:border-transparent"><i class="fa-solid fa-thumbs-up"></i></button>
      <button id="adoptButton-${pet.petId}" onclick="handleSearch(${pet.petId})" class="btn btn-primary text-lg font-bold text-teal-600 bg-transparent border-violet-400 hover:bg-teal-600 hover:text-white hover:border-transparent">Adopt</button>
      <button onclick="loadDetails(${pet.petId})" class="btn btn-primary text-lg font-bold text-teal-600 bg-transparent border-violet-400 hover:bg-teal-600 hover:text-white hover:border-transparent">Details</button>
    </div>
  </div>
</div>
  `;
  allPetContainer.append(card);

  const likeButton = card.querySelector('.like-btn');
  likeButton.addEventListener('click', function() {
    const petImage = (`${pet.image}`); 
   const card2 = document.createElement("div")
   card2.innerHTML=
   `
   <div class="w-32 gap-4 mb-2 ">
      <img src="${petImage}" alt="Favorite Pet" class="w-full h-auto object-cover">
    </div>
   `;
   const likeDiv = document.getElementById('like-pet');
  likeDiv.appendChild(card2); 
  });

  //  show the adoption
  const adoptButton = document.getElementById(`adoptButton-${pet.petId}`);
  adoptButton.addEventListener("click", () => {
    const modal = document.getElementById("my_modal_2"); 
    modal.showModal(); 
  });

})
}



// create displayCategories
  const displayCategories = (categories) => {
   const categoryContainer = document.getElementById("categoryButton");

    categories.forEach((item) => {
        console.log(item);
    // create buttons
  const buttoncontainer = document.createElement("div");
  buttoncontainer.innerHTML=
  `
  <button id="btn-${item.id}" onclick="loadCategoriesVideos('${item.category}')" class="btn category-btn bg-transparent border-violet-400">
   
   <img src="${item.category_icon}" alt="${item.category}" class="w-10 h-10 font-bold">
   <span class="text-xl">${item.category}</span> 
  </button>
  `; 
    // add button to categoryContainer
    categoryContainer.append(buttoncontainer);
    });
  }



  // adoption modal
  function openModal() {
    const modal = document.getElementById("my_modal_2");
    modal.showModal(); 
  }

const loading = (petId) => {
  document.getElementById("countDown").style.display="none";
  const modal = document.getElementById("my_modal_2"); 
  modal.close(); 

  const currentAdoptButton = document.querySelector(`#adoptButton-${petId}`);
  if (currentAdoptButton) {
    console.log(currentAdoptButton);
    // Disable the button
    currentAdoptButton.disabled = true; 
    currentAdoptButton.classList.add('opacity-50', 'cursor-not-allowed'); 
    currentAdoptButton.textContent = "Adopted";
  }
}



const handleSearch = (petId) => {
  currentPetId = petId; 
  counter = 3; 
  const countdownElement = document.getElementById("countDown");
  countdownElement.style.display = "block"; 
  countdownElement.innerHTML = `<span style="font-size: 3rem; font-weight: bold;">${counter}</span>`; 

  countdownInterval = setInterval(() => {
    counter--; 
    countdownElement.innerHTML = `<span style="font-size: 3rem; font-weight: bold;">${counter}</span>`; 

    
    if (counter <= 0) {
      clearInterval(countdownInterval); 
      loading(petId); 
    }
  }, 1000); 
};


loadCategories();
loadPets();

