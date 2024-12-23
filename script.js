document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");
  const gridDiv = document.getElementById("grid-div");
  let currentTab = "daily"; // Default tab

  const colors = [
    "light-red-work",
    "soft-blue-play",
    "light-red-study",
    "lime-green-exercise",
    "violet-social",
    "soft-orange-self-care",
  ];

  // navigation button
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("text-white"));
      button.classList.add("text-white");
      currentTab = button.innerHTML.trim().toLowerCase();
      //console.log(currentTab);
      updateDataDisplay(currentTab);
    });
  });

  function updateDataDisplay(nav) {
    // Check if there is a second child and remove it
    while (gridDiv.children.length > 1) {
      gridDiv.removeChild(gridDiv.lastChild);
    }

    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((post, index) => {
          const color = colors[index % colors.length];

          console.log(nav);

          const current = post.timeframes[nav].current;
          const previous = post.timeframes[nav].previous;

          const card = document.createElement("div");
          card.classList.add(
            "card",
            `bg-${color}`,
            "h-36",
            "md:h-44",
            "relative",
            "rounded-xl",
            "overflow-hidden",
            "flex"
          );

          const img = document.createElement("img");
          img.src = `images/icon-${post.title
            .toLowerCase()
            .split(" ")
            .join("-")}.svg`;
          img.classList.add("float-right");
          img.alt = `${post.title}-icon`;

          const innerContent = document.createElement("div");
          innerContent.classList.add(
            "bg-dark-blue",
            "flex",
            "flex-col",
            "gap-2",
            "justify-between",
            "px-6",
            "py-7",
            "w-full",
            "rounded-xl",
            "absolute",
            "inset-x-0",
            "bottom-0",
            "basis-3/4"
          );

          // Category title row
          const titleDiv = document.createElement("div");
          titleDiv.classList.add(
            "text-white",
            "my-auto",
            "flex",
            "flex-row",
            "justify-between"
          );

          // title design
          const titleP = document.createElement("p");
          titleP.classList.add("text-base");
          titleP.textContent = post.title;

          // ellipsis img link
          const ellipsisA = document.createElement("a");
          ellipsisA.href = "#";
          ellipsisA.classList.add("cursor-pointer", "my-auto");

          // ellipsis img
          const ellipsisImg = document.createElement("img");
          ellipsisImg.src = "images/icon-ellipsis.svg";
          ellipsisImg.alt = "dots";

          // div to display data time
          const timeDiv = document.createElement("div");
          timeDiv.classList.add(
            "my-auto",
            "flex",
            "flex-row",
            "md:flex-col",
            "justify-between"
          );

          // Current data
          const timeH1 = document.createElement("h1");
          timeH1.classList.add("text-2xl", "md:text-4xl", "text-white");
          timeH1.innerHTML = `<span id="${post.title}-data">${current}</span>hrs`;

          //Previous Data
          const timeP = document.createElement("p");
          timeP.classList.add("text-sm", "my-auto", "text-pale-blue");
          timeP.innerHTML = `Last week - <span id="last-week-${post.title}">${previous}</span>`;

          titleDiv.appendChild(titleP);
          ellipsisA.appendChild(ellipsisImg);
          titleDiv.appendChild(ellipsisA);

          timeDiv.appendChild(timeH1);
          timeDiv.appendChild(timeP);

          innerContent.appendChild(titleDiv);
          innerContent.appendChild(timeDiv);

          card.appendChild(img);
          card.appendChild(innerContent);

          //card.appendChild(innerCard);
          gridDiv.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  updateDataDisplay(currentTab); // Display default cards on initial load
});
