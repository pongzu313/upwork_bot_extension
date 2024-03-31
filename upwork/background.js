chrome.commands.onCommand.addListener(async (command) => {
  switch (command) {
    case "start_profile":
      await start_profile();
      break;
    default:
      console.log(`Command ${command} not found`);

    case "start_profile":
      await start_creds();
      break;
  }
});

const start_profile = async () => {
  getActiveTab = async () => {
    const query = { active: true, currentWindow: true };
    const tabs = await chrome.tabs.query(query);

    return tabs[0];
  };
  const tab = await getActiveTab();
  chrome.tabs.sendMessage(tab.id, { action: "start_profile" });
};

const start_creds = async () => {
  getActiveTab = async () => {
    const query = { active: true, currentWindow: true };
    const tabs = await chrome.tabs.query(query);

    return tabs[0];
  };
  const tab = await getActiveTab();
  chrome.tabs.sendMessage(tab.id, { action: "start_creds" });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // if (request.greeting === "showNotification") {
  //   createNotification();
  //   sendResponse({ farewell: "Notification was shown" });

  //   const emUrl = "https://www.upwork.com/freelancers/settings/contactInfo";
  //   chrome.tabs.create({ url: emUrl }); // Correct property is 'url'

  //   const notiUrl = "https://www.upwork.com/ab/notification-settings/";
  //   chrome.tabs.create({ url: notiUrl }); // Correct property is 'url'
  // }
});

// chrome.runtime.onInstalled.addListener(async () => {
//   const url = "https://www.upwork.com/nx/signup/"; // Replace with your specific URL
//   chrome.tabs.create({ url }); // This will open a new tab with the specified URL
// });

chrome.runtime.onInstalled.addListener(async () => {
  const url = "https://www.upwork.com/nx/signup/"; // Replace with your specific URL

  // Query for the active tab in the current window
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // Check if there's at least one tab (should always be true for an active window)
    if(tabs.length > 0) {
      // Use tabs[0].id to target the current tab and update its URL
      chrome.tabs.update(tabs[0].id, {url: url});
    }
  });
});

function createNotification() {
  let notificationOptions = {
    type: "basic",
    title: "Upwork",
    message: "Your profile is ready",
    iconUrl: "upwork.png",
  };
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTabId = tabs[0].id;
    chrome.notifications.create(
      currentTabId.toString(),
      notificationOptions,
      function () {
        console.log("Notification was created");
      }
    );
  });

  // const startupUrl = "chrome://settings/onStartup"; // Replace with your specific URL
  // chrome.tabs.create({ startupUrl });
}

function waitForPageLoad(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
