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
const displayDetails = (pet) => {
  console.log(pet);
  const detailContainer = document.getElementById("modal-contant")

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

pets.forEach((pet) => {
  console.log(pet);
  const card = document.createElement("div");
  card.innerHTML=
  `
  <div class="card border-2 rounded-xl w-96">
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
    <button class="btn btn-primary text-xl font-bold text-teal-600 bg-transparent border-violet-400"><i class="fa-solid fa-thumbs-up"></i></button>
      <button class="btn btn-primary text-xl font-bold text-teal-600 bg-transparent border-violet-400">Adopt</button>
      <button onclick="loadDetails(${pet.petId})" class="btn btn-primary text-xl font-bold text-teal-600 bg-transparent border-violet-400">Details</button>
    </div>
  </div>
</div>
  `;
  allPetContainer.append(card);
})
}

// create displayCategories
  const displayCategories = (categories) => {
   const categoryContainer = document.getElementById("categoryButton");

    categories.forEach((item) => {
        console.log(item);
    // create buttons
  const button = document.createElement("button");
  button.classList = "btn bg-transparent border-violet-400 ";
  button.innerHTML = `
  <img src="${item.category_icon}" alt="${item.category}" class="w-10 h-10 font-bold ">
  <span class=" text-xl">${item.category}</span>
`;
    // add button to categoryContainer
    categoryContainer.append(button);
    });
  }

loadCategories();
loadPets();

