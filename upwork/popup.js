let selectedProfile;

async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

document.addEventListener("DOMContentLoaded", () => {
  let profiles = [];

  if (localStorage.getItem("profiles")) {
    profiles = JSON.parse(localStorage.getItem("profiles"));

    profiles.forEach((profile) => {
      addListItem(profile);
    });
  }

  function addListItem(profile) {
    const profilesList = document.querySelector("#profilesList");
    const newListItem = document.createElement("li");

    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "profile";
    radioInput.id = profile.name;
    radioInput.value = profile.name;

    const label = document.createElement("label");
    label.htmlFor = profile.name;
    label.textContent = profile.name;

    newListItem.appendChild(radioInput);
    newListItem.appendChild(label);

    // Modified click event listener
    newListItem.addEventListener("click", (event) => {
      if (event.target !== radioInput) {
        radioInput.click();
      }

      // Clear `.selected` from any previously selected list item
      let selectedListItem = document.querySelector(
        "#profilesList li.selected"
      );
      if (selectedListItem) {
        selectedListItem.classList.remove("selected");
      }
      selectedProfile = profile;
      // Add `.selected` to the clicked list item
      newListItem.classList.add("selected");
    });

    profilesList.appendChild(newListItem);
  }
});

document.getElementById("btn_start").addEventListener("click", async () => {
  if (!selectedProfile) {
    alert("Please select a profile first.");
    return;
  }

  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: create_profile_1,
    args: [selectedProfile],
  });
}); //btn_set

document.getElementById("btn_set").addEventListener("click", function () {
  window.open(chrome.runtime.getURL("options.html"));
});

async function create_profile_1(profile) {
  console.log("hello started");
  var random_city = generateRandomUppercaseLetter();
  var random_zip_address = generateRandomPostCode();
  var random_phone_number = generateRandomPhoneNumber();
  var randome_address = generateRandomAddress();
  var random_birthday_date = generateRandomDate();

  await profile_title();
  await work_experience();
  await profile_education();
  await profile_language();
  await fill_skill();
  await profile_summary();
  await profile_category();
  await profile_rate();
  await profile_general();

  function profile_title() {
    var inputTitle = document.querySelector("input[type='text']");
    inputTitle.value = profile.title;
    inputTitle.dispatchEvent(new Event("change", { bubbles: true }));
    inputTitle.dispatchEvent(new Event("input", { bubbles: true }));
    inputTitle.dispatchEvent(new Event("blur", { bubbles: true }));
    console.log("what is the problem");
    const nextBtn = document.querySelector('button[data-test="next-button"]');
    if (nextBtn) {
      nextBtn.click();
    } else {
      console.log("Button element not found");
    }
  }
  async function work_experience() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("After delay");
        resolve(); // Resolving the promise after the delay
      }, 2000); // Delay is specified in milliseconds (2 seconds in this example)
    });
    const currentURL = window.location.href;
    console.log("current url", currentURL);
    if (currentURL !== "https://www.upwork.com/nx/create-profile/employment") {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
      return work_experience();
    } else {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
    }
  }

  async function profile_education() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("After delay");
        resolve(); // Resolving the promise after the delay
      }, 2000); // Delay is specified in milliseconds (2 seconds in this example)
    });
    const currentURL = window.location.href;
    if (currentURL !== "https://www.upwork.com/nx/create-profile/education") {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
      return profile_education();
    } else {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
    }
  }

  async function profile_language() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("After delay Language!");
        resolve(); // Resolving the promise after the delay
      }, 2000); // Delay is specified in milliseconds (2 seconds in this example)
    });
    const currentURL = window.location.href;
    console.log("current url", currentURL);
    if (currentURL !== "https://www.upwork.com/nx/create-profile/languages") {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
      return profile_language();
    } else {
      const dropdown = document.querySelector(
        'div[data-test="dropdown-toggle"]'
      );
      dropdown.click();
      // Call the function to start the process
      let dropdownBox = document.querySelector("#dropdown-menu");
      if (dropdownBox) {
        let liElement = dropdownBox.querySelector("li:nth-child(4)");
        if (liElement) {
          liElement.click();
          const nextBtn = document.querySelector(
            'button[data-test="next-button"]'
          );
          if (nextBtn) {
            nextBtn.click();
            return;
          } else {
            console.log("Button element not found");
          }
        } else {
          return profile_language();
        }
      } else {
        return profile_language();
      }
    }
  }

  async function fill_skill() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("After delay");
        resolve(); // Resolving the promise after the delay
      }, 2000); // Delay is specified in milliseconds (2 seconds in this example)
    });
    const currentURL = window.location.href;
    console.log("current url", currentURL);
    if (currentURL !== "https://www.upwork.com/nx/create-profile/skills") {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
      return fill_skill();
    }
    return new Promise((resolve, reject) => {
      const skillstring = profile.skills;
      const skills = skillstring.split(", ");
      processArray(skills).then(() => resolve());
    });
  }

  function processSearchItem(item, callback) {
    if (item == undefined) {
      var closeBtn = document.querySelector(
        'button[data-test="dropdown-close"]'
      );
      if (closeBtn) closeBtn.click();
      return;
    }
    var xpath = '//input[@type="search"]';
    var result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    result.focus();
    if (result && result instanceof HTMLInputElement) {
      result.value = item;
      result.dispatchEvent(new Event("input", { bubbles: true }));
    }
    result.click();

    var xpath1 = '//*[contains(@id, "typeahead-input-control")]/li[1]';
    var attemptCount = 0;
    var intervalId = setInterval(function () {
      var result2 = document.evaluate(
        xpath1,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (result2 !== null) {
        result2.click();
        clearInterval(intervalId);
        callback();
      } else if (attemptCount > 3) {
        // checking if 7 seconds have passed
        console.log(
          "Element not found for",
          item,
          "in 7 seconds. Re-running function."
        );
        clearInterval(intervalId); // stop current interval
        processSearchItem(item, callback); // rerun the function
      } else {
        attemptCount++; // increment attempt count if element not found
      }
    }, 1000);
  }

  function processArray(array) {
    return new Promise((resolve, reject) => {
      if (array.length === 0) resolve();

      var item = array.shift();
      processSearchItem(item, function () {
        processArray(array).then(() => resolve());
      });
    });
  }

  async function profile_summary() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("After delay");
        resolve(); // Resolving the promise after the delay
      }, 2000); // Delay is specified in milliseconds (2 seconds in this example)
    });
    const currentURL = window.location.href;
    console.log("current url", currentURL);
    if (currentURL !== "https://www.upwork.com/nx/create-profile/overview") {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
      return profile_summary();
    } else {
      const textElement = document.querySelector("textarea");
      textElement.value = profile.summary;
      textElement.dispatchEvent(new Event("change", { bubbles: true }));
      textElement.dispatchEvent(new Event("input", { bubbles: true }));
      textElement.dispatchEvent(new Event("blur", { bubbles: true }));
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
    }
  }

  async function profile_category() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("After delay");
        resolve(); // Resolving the promise after the delay
      }, 2000); // Delay is specified in milliseconds (2 seconds in this example)
    });
    const currentURL = window.location.href;
    console.log("current url", currentURL);
    if (currentURL !== "https://www.upwork.com/nx/create-profile/categories") {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
      return profile_category();
    } else {
      const buttons = document.querySelectorAll(
        'button[data-qa="category-add-btn"]'
      );

      buttons.forEach((button) => {
        const attemptClick = setInterval(() => {
          try {
            // Try to click the button
            button.click();
            // If the click succeeded, clear the interval to stop trying
            clearInterval(attemptClick);
          } catch (error) {
            // If there's an error (e.g., the button is not clickable), it will try again
            console.error("Click attempt failed, retrying...", error);
          }
        }, 1000); // Attempt to click every 1000 milliseconds (1 second)
      });

      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        console.log("Button clicked!");
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
    }
  }
  async function profile_rate() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("After delay");
        resolve(); // Resolving the promise after the delay
      }, 2000); // Delay is specified in milliseconds (2 seconds in this example)
    });
    const currentURL = window.location.href;
    console.log("current url", currentURL);
    if (currentURL !== "https://www.upwork.com/nx/create-profile/rate") {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
      return profile_rate();
    } else {
      let inputElement = document.querySelectorAll(
        'input[data-test="currency-input"]'
      )[0];
      // Setting a value
      inputElement.value = profile.rate;

      // Create a new 'Event' of type 'Event' (or 'InputEvent', 'UIEvent', etc., depending on the use case)
      let event = new Event("input", {
        bubbles: true,
        cancelable: true,
      });

      // Dispatch the event
      inputElement.dispatchEvent(event);
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
    }
  }

  async function profile_general() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("After delay");
        resolve(); // Resolving the promise after the delay
      }, 2000); // Delay is specified in milliseconds (2 seconds in this example)
    });
    const currentURL = window.location.href;
    console.log("current url", currentURL);
    if (currentURL !== "https://www.upwork.com/nx/create-profile/location") {
      const nextBtn = document.querySelector('button[data-test="next-button"]');
      if (nextBtn) {
        nextBtn.click();
      } else {
        console.log("Button element not found");
      }
      return profile_general();
    } else {
      function fill_street() {
        var dateElement = document.querySelector(
          'input[aria-labelledby="date-of-birth-label"]'
        );

        dateElement.value = random_birthday_date;
        dateElement.dispatchEvent(new Event("change", { bubbles: true }));
        dateElement.dispatchEvent(new Event("input", { bubbles: true }));
        dateElement.dispatchEvent(new Event("blur", { bubbles: true }));

        var streetElement = document.querySelector(
          'input[aria-labelledby="street-label"]'
        );

        streetElement.value = randome_address;
        streetElement.dispatchEvent(new Event("change", { bubbles: true }));
        streetElement.dispatchEvent(new Event("input", { bubbles: true }));
        streetElement.dispatchEvent(new Event("blur", { bubbles: true }));

        var zipcodElement = document.querySelector(
          'input[aria-labelledby="postal-code-label"]'
        );

        zipcodElement.value = random_zip_address;
        zipcodElement.dispatchEvent(new Event("change", { bubbles: true }));
        zipcodElement.dispatchEvent(new Event("input", { bubbles: true }));
        zipcodElement.dispatchEvent(new Event("blur", { bubbles: true }));

        var telephoneElement = document.querySelector('input[type="tel"]');

        telephoneElement.value = random_phone_number;
        telephoneElement.dispatchEvent(new Event("change", { bubbles: true }));
        telephoneElement.dispatchEvent(new Event("input", { bubbles: true }));
        telephoneElement.dispatchEvent(new Event("blur", { bubbles: true }));
        chrome.runtime.sendMessage(
          { greeting: "showNotification" },
          function (response) {
            console.log(response.farewell);
          }
        );
      }
      async function selectCity() {
        var cityElement = document.querySelector(
          'input[aria-labelledby="city-label"]'
        );
        // Setting a value
        cityElement.click();
        var listCityElement = document.querySelectorAll(
          'input[aria-labelledby="city-label"]'
        );
        let event = new Event("input", {
          bubbles: true,
          cancelable: true,
        });

        if (listCityElement.length == 2) {
          listCityElement[1].value = random_city;
          listCityElement[1].dispatchEvent(event);
        } else {
          listCityElement[0].value = random_city;
          listCityElement[0].dispatchEvent(event);
        }
        let firstCityLi = document.querySelector(
          'ul[aria-labelledby="city-label"]'
        );

        if (firstCityLi !== null) {
          if (firstCityLi.childElementCount !== 0) {
            firstCityLi.firstElementChild.click();
            var closeBtn = document.querySelector(
              'button[data-test="dropdown-close"]'
            );
            if (closeBtn) closeBtn.click();
            setTimeout(fill_street, 1000);
            return;
          }
          setTimeout(selectCity, 500); // Check again after 500ms
        } else {
          setTimeout(selectCity, 500); // Check again after 500ms
        }
      }
      await selectCity();
    }
  }

  function generateRandomPostCode() {
    // const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // const nums = "0123456789";

    // let part1 = "";
    // let part2 = "";

    // part1 += nums.charAt(Math.floor(Math.random() * nums.length));
    // part1 += chars.charAt(Math.floor(Math.random() * chars.length));
    // part1 += chars.charAt(Math.floor(Math.random() * chars.length));

    // part2 += chars.charAt(Math.floor(Math.random() * chars.length));
    // part2 += chars.charAt(Math.floor(Math.random() * chars.length));
    // part2 += nums.charAt(Math.floor(Math.random() * nums.length));

    // return part1 + " " + part2;
    return "V6C 1P7";
  }

  function generateRandomDate() {
    // var start = new Date(1980, 0, 1); // start date
    // var end = new Date(1999, 11, 31); // end date

    // var randomDate = new Date(
    //   start.getTime() + Math.random() * (end.getTime() - start.getTime())
    // );

    // var year = randomDate.getFullYear();
    // var month = ("0" + (randomDate.getMonth() + 1)).slice(-2); // Add 1 because months are zero-based.
    // var day = ("0" + randomDate.getDate()).slice(-2);

    // return `${year}-${month}-${day}`;
    return "1986-10-16";
  }

  function generateRandomAddress() {
    // var streetNames = [
    //   "Leknas",
    //   "Grand",
    //   "Main",
    //   "Oak",
    //   "Pine",
    //   "Maple",
    //   "Cedar",
    //   "Elm",
    //   "Walnut",
    //   "Birch",
    //   "Cherry",
    //   "Pear",
    //   "Spruce",
    //   "Willow",
    //   "Poplar",
    //   "Aspen",
    //   "Hickory",
    //   "Beech",
    //   "Cypress",
    //   "Dogwood",
    //   "Linden",
    //   "Holly",
    //   "Juniper",
    //   "Magnolia",
    //   "Mulberry",
    //   "Rose",
    //   "Sycamore",
    //   "Tulip",
    //   "Violet",
    //   "Hawthorn",
    //   "Ash",
    // ];

    // // Create a random house number between 1 and 999
    // var houseNumber = Math.floor(Math.random() * 999) + 1;

    // // Select a random street
    // var street = streetNames[Math.floor(Math.random() * streetNames.length)];

    // // Create a random letter between A and F
    // var letter = String.fromCharCode(65 + Math.floor(Math.random() * 6));

    // return `${houseNumber} ${street} St ${letter}`;
    return "801 W GEORGIA ST";
  }

  function generateRandomPhoneNumber() {
    let phoneNumber = "";
    for (let i = 0; i < 10; i++) {
      // Math.floor(Math.random() * 10) generates a random integer from 0 to 9
      phoneNumber += Math.floor(Math.random() * 10);
    }
    return phoneNumber;
  }

  function generateRandomUppercaseLetter() {
    // 65 is the ASCII value for 'A' and 90 is for 'Z'
    let randomAscii = Math.floor(Math.random() * (90 - 65 + 1)) + 65;

    // Convert ASCII to character
    let randomLetter = String.fromCharCode(randomAscii);

    return randomLetter;
  }
}
