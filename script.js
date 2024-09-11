import { v4 as uuidv4 } from "https://cdn.jsdelivr.net/npm/uuid@8.3.2/dist/esm-browser/index.js";
// search Input

const searchInput = document.querySelector(".search-input");

// Add Inputs

const addProjectTitle = document.querySelector("#project-title");
const addProjectDescription = document.querySelector("#project-description");
const addProjectLink = document.querySelector("#project-link");
const addProjectTechnologies = document.querySelector("#project-technologies");

// Project Items Container

const myProjectsItems = document.querySelector(".my-projects-items");

const myProjectsContainer = document.querySelector(".my-projects-container");

const addBtn = document.querySelector("#add-btn");
const projectItemsData = [];

let isUpdateMode = false;
let currentItemId = null;

function ItemConstructor(title, description, link, technologies) {
  let now = new Date();
  this.id = uuidv4();
  this.date = formatDateTurkish(now);
  this.title = title;
  this.description = description;
  this.link = link;
  this.technologies = technologies;
}

addBtn.addEventListener("click", () => {
  const isValidInputs =
    addProjectTitle.value.trim() === "" ||
    addProjectDescription.value.trim() === "" ||
    addProjectLink.value.trim() === "" ||
    addProjectTechnologies.value.trim() === "";

  if (isValidInputs) {
    console.log("Please fill all fields");
    return;
  }

  if (isUpdateMode) {
    updateItemInData(
      currentItemId,
      addProjectTitle.value,
      addProjectDescription.value,
      addProjectLink.value,
      addProjectTechnologies.value
    );
  } else {
    addItemToData(
      addProjectTitle.value,
      addProjectDescription.value,
      addProjectLink.value,
      addProjectTechnologies.value
    );
  }

  addProjectTitle.value = "";
  addProjectDescription.value = "";
  addProjectLink.value = "";
  addProjectTechnologies.value = "";

  isUpdateMode = false;
  currentItemId = null;
  addBtn.textContent = "Add Project";

  console.log("Project added/updated successfully");

  if (projectItemsData.length > 2) {
    myProjectsContainer.classList.add("active-scrollbar");
  }
});

function addItemToData(title, description, link, technologies) {
  projectItemsData.push(
    new ItemConstructor(title, description, link, technologies)
  );
  addProjectTitle.value = "";
  addProjectDescription.value = "";
  addProjectLink.value = "";
  addProjectTechnologies.value = "";

  displayData();
}

function formatDateTurkish(date) {
  // Türkçe gün ve ay isimleri
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  // Tarih objesinden gün, ay, yıl, saat ve dakika bilgilerini al
  const dayOfWeek = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Türkçe formatında tarihi oluştur
  return `${dayOfWeek}, ${day} ${month} ${year} ${hours}:${minutes}`;
}

displayData();

function displayData() {
  myProjectsItems.innerHTML = "";

  for (const item of projectItemsData) {
    let itemDiv = `
                  <div data-id="${item.id}" class="project-item">
                <div class="my-project-header-wrapper">
                  <h1 class="my-project-title">${item.title}</h1>
                  <div class="my-project-controls">
                    <i class="fa-solid fa-pen-to-square update" onclick="updateItem('${item.id}')"></i>
                    <i class="fa-solid fa-xmark delete" onclick="deleteItem('${item.id}')"></i>
                  </div>
                
                </div>
                <div class="my-project-desc-wrapper">
                  <h4>Description</h4>
                  <p class="my-project-desc">${item.description}</p>
                </div>
                <div class="my-project-link-wrapper">
                  <h4>Project Link</h4>
                  <a href="#" class="my-project-link">${item.link}</a>
                </div>
                <div class="my-project-technologies-wrapper">
                  <h4>Technologies</h4>
                  <div class="project-technologies">
${item.technologies}
                  </div>
                </div>
                <div class="my-project-footer-wrapper">
                  <p class="my-project-date">${item.date}</p>
                </div>
              </div>

    `;

    myProjectsItems.insertAdjacentHTML("beforeend", itemDiv);
  }
  console.log(projectItemsData);
}

window.deleteItem = (id) => {
  // console.log("Item deleted", id);
  projectItemsData.map((item, index) => {
    if (item.id === id) {
      projectItemsData.splice(index, 1);

      if (projectItemsData.length < 3) {
        myProjectsContainer.classList.remove("active-scrollbar");
      }

      displayData();
    }
  });
};

window.updateItem = (id) => {
  const updateToItem = projectItemsData.find((item) => item.id === id);

  // console.log(updateToItem);

  if (updateToItem) {
    // Mevcut verileri input alanlarına koy
    addProjectTitle.value = updateToItem.title;
    addProjectDescription.value = updateToItem.description;
    addProjectLink.value = updateToItem.link;
    addProjectTechnologies.value = updateToItem.technologies;

    isUpdateMode = true;
    currentItemId = id;

    addBtn.textContent = "Update Project";
  }
};

function updateItemInData(id, title, description, link, technologies) {
  // İlgili öğeyi bul ve güncelle
  const itemIndex = projectItemsData.findIndex((item) => item.id === id);
  let now = new Date();

  if (itemIndex !== -1) {
    projectItemsData[itemIndex].date = formatDateTurkish(now);
    projectItemsData[itemIndex].title = title;
    projectItemsData[itemIndex].description = description;
    projectItemsData[itemIndex].link = link;
    projectItemsData[itemIndex].technologies = technologies
      .split(",")
      .map((tech) => tech.trim());

    displayData();
  }
}

const changeIcon = document.querySelector("#myProjects-icon");

changeIcon.addEventListener("click", () => {
  changeIcon.classList.toggle("fa-power-off");
  document.querySelector("#projects-container").classList.toggle("collapsed");
  document.querySelector("#footer-container").classList.toggle("collapsed");
  document.querySelector(".search-container").classList.toggle("collapsed");
  document.querySelector("body").classList.toggle("bodyEffect");
});
