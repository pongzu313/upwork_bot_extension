const names = {
  firstName: [
    "David"
  ],
  lastName: [
    "Johnson"
  ],
  contries: [
    "Canada"
  ],
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start_profile") {
    create_profile();
  }
  return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start_creds") {
    start_creds();
  }
  return true;
});

const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

// Simulate typing into an input field
const simulateTyping = (element, value) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;
  const inputEvent = new Event("input", { bubbles: true });

  nativeInputValueSetter.call(element, value);
  element.dispatchEvent(inputEvent);
};

// Function to start automating the credentials input
async function start_creds() {
  await creds();
  async function creds() {
    const currentURL = window.location.href;
    await waitForPageLoad(2000);
    if (currentURL !== "https://www.upwork.com/nx/signup/") {
      return creds();
    } else {
      // Uncomment and update the following sections if needed
      const inputElement = document.querySelector('div[data-qa="work"]');
      if (inputElement) {
        inputElement.click();
      }
      await waitForPageLoad(2000);
      const appluBtm = document.querySelector('[data-qa="btn-apply"]');
      if (appluBtm) {
        appluBtm.click();
      }
      await waitForPageLoad(2000);

      // Input first name
      const inputFirstName = document.querySelector(
        'input[id="first-name-input"]'
      );
      if (inputFirstName) {
        simulateTyping(
          inputFirstName,
          getRandomElement(names.firstName).trim()
        );
      }

      // Input last name
      const inputLastName = document.querySelector(
        'input[id="last-name-input"]'
      );
      if (inputLastName) {
        simulateTyping(inputLastName, getRandomElement(names.lastName).trim());
      }

      // Input password
      const inputPass = document.querySelector('input[id="password-input"]');
      if (inputPass) {
        simulateTyping(inputPass, "goldwater313");
      }

      const country = document.querySelector(
        'div[data-test="dropdown-toggle"]'
      );

      if (country) {
        country.click();
      }

      await waitForPageLoad(1000);

      selectCountry();

      // await clickElementById("checkbox-promo");
    }
  }
}

// async function clickElementById(id) {
//   const promo = document.getElementById(id);
//   if (promo) {
//     promo.click();
//   } else {
//     console.error("Element not found with ID:", id);
//   }
// }

const selectCountry = async (maxRetries = 10) => {
  for (let i = 0; i < maxRetries; i++) {
    const cuntryIdx = document.querySelector(
      'input[autocomplete="country-name"]'
    );
    if (cuntryIdx) {
      simulateTyping(cuntryIdx, getRandomElement(names.contries).trim());
      await waitForPageLoad(2000); // Wait for dropdown to populate
    }

    let dropdownBox = document.querySelector('ul[id="dropdown-menu"]');
    if (dropdownBox) {
      let liElement = dropdownBox.querySelector("li:nth-child(1)"); // Use 1-indexed nth-child
      if (liElement) {
        liElement.click();
        break;
      }
    } else {
      await waitForPageLoad(1000); // Wait and retry
    }
  }
};

async function create_profile() {
  const nextBtn = document.querySelector('[data-qa="get-started-btn"]');
  nextBtn.click();

  await freelance_experience();
  await goal();
  await work_preference();
  await resume();

  async function freelance_experience() {
    await waitForPageLoad(2000);
    const currentURL = window.location.href;
    if (currentURL !== "https://www.upwork.com/nx/create-profile/experience") {
      return freelance_experience();
    } else {
      const inputElement = document.querySelector(
        'input[value="FREELANCED_BEFORE"]'
      );
      if (inputElement) {
        inputElement.click();
      } else {
        console.log("Input element not found");
        return freelance_experience();
      }
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
        return freelance_experience();
      }
    }
  }

  async function goal() {
    await waitForPageLoad(2000);
    const currentURL = window.location.href;
    if (currentURL !== "https://www.upwork.com/nx/create-profile/goal") {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      }
      return goal();
    } else {
      const inputElement = document.querySelector('input[value="MAIN_INCOME"]');
      if (inputElement) {
        inputElement.click();
      } else {
        console.log("Input element not found");
      }
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
    }
  }

  async function work_preference() {
    await waitForPageLoad(2000);
    const currentURL = window.location.href;
    if (
      currentURL !== "https://www.upwork.com/nx/create-profile/work-preference"
    ) {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
      return work_preference();
    } else {
      var inputElement = document.querySelector(
        'input[data-ev-label="button_box_checkbox"]'
      );

      if (inputElement) {
        inputElement.click();
      } else {
        console.log("Input element not found");
      }

      const checkElement = document.querySelector(
        'span[data-test="checkbox-input"]'
      );
      if (checkElement) {
        checkElement.click();
      } else {
        console.log("Button element not found");
      }

      const nextBtn1 = document.querySelector(
        'button[data-test="next-button"]'
      );
      nextBtn1.click();
      console.log("Button element clicked");
    }
  }

  async function resume() {
    await waitForPageLoad(2000);
    const currentURL = window.location.href;
    if (
      currentURL !== "https://www.upwork.com/nx/create-profile/resume-import"
    ) {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
      return resume();
    } else {
      const resumeElement = document.querySelector(
        'button[data-qa="resume-upload-btn-mobile"]'
      );
      if (resumeElement) {
        resumeElement.click();
      } else {
        console.log("Input element not found");
      }
    }
  }
}

function waitForPageLoad(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
