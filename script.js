const categoryCard = document.getElementById("category-card");
const category = ["work", "play", "study", "exercise", "social", "self-care"];
const colors = [
  "light-red-work",
  "soft-blue-play",
  "light-red-study",
  "lime-green-exercise",
  "violet-social",
  "soft-orange-self-care",
];

document.addEventListener("DOMContentLoaded", () => {
  category.forEach((cat, index) => {
    let color = colors[index];

    categoryCard.innerHTML += `
        <div class="bg-${color} h-40 relative rounded-xl overflow-hidden">

          <img src="images/icon-${cat}.svg" class="float-right" alt="work-icon">

         <div class="bg-dark-blue flex flex-col gap-2 justify-between px-6 py-7 w-full rounded-xl absolute inset-x-0 bottom-0">
          
         <div class="text-white my-auto flex flex-row justify-between">
            <p class="text-base">${
              cat.charAt(0).toUpperCase() + cat.slice(1)
            }</p>
            <a href="#" class="cursor-pointer my-auto"><img src="images/icon-ellipsis.svg" alt="dots"></a>
          </div>
          <div class="my-auto text-pale-blue flex flex-row md:flex-col justify-between">
          <h1 class="text-2xl"><span id="${cat}-data">00</span>hrs</h1>
            <p class="text-sm my-auto">Last week - <span id="last-week-${cat}">36 hrs</span></p>
          </div>
         </div>
         </div>
        `;
  });
});



