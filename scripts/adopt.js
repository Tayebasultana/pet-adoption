
//1- fetch, load and show catagories in html

// create loadCategories
const loadCategories = () => {
    // fetch the data
   fetch("https://openapi.programming-hero.com/api/peddy/categories")
   .then((res) => res.json())
   .then((data) => displayCategories(data.categories))
   .catch((error) => console.log(error))
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


const viewMoreButton = document.getElementById("viewMoreButton");     
const adoptSection = document.getElementById("adoptSection");

viewMoreButton.addEventListener("click", function() {
adoptSection.scrollIntoView({ behavior: "smooth" });
});