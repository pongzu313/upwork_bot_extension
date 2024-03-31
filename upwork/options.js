document.addEventListener("DOMContentLoaded", () => {
  const importButton = document.getElementById("import");
  const exportButton = document.getElementById("export");
  const importFileInput = document.getElementById("import-file");
  const formData = document.getElementById("profile-form");
  const profilesTable = document.getElementById("profile-table");

  let profiles = [];

  // Load profiles if any
  if (localStorage.getItem("profiles")) {
    profiles = JSON.parse(localStorage.getItem("profiles"));

    profiles.forEach((profile) => {
      addRow(profile);
    });
  }

  function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          profiles = JSON.parse(allText);
          localStorage.setItem("profiles", JSON.stringify(profiles));

          profiles.forEach((profile) => {
            addRow(profile);
          });
        }
      }
    };
    rawFile.send(null);
  }

  importButton.onclick = () => {
    readTextFile("file:///D:/mydata/upwork_bot_extension/profiles.json");
  };

  // importFileInput.onchange = (event) => {
  //   const file = event.target.files[0];

  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     profiles = JSON.parse(fileReader.result);
  //     localStorage.setItem("profiles", JSON.stringify(profiles));

  //     profiles.forEach((profile) => {
  //       addRow(profile);
  //     });
  //   };

  //   fileReader.readAsText(file);
  // };

  exportButton.onclick = () => {
    const blob = new Blob([JSON.stringify(profiles)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "profiles.json";
    link.click();
  };

  formData.onsubmit = (event) => {
    event.preventDefault();

    const profileSkillsInput = document.getElementById("profile-skills");
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const skills = JSON.parse(fileReader.result).skill;

      const profile = {
        name: document.getElementById("profile-name").value,
        title: document.getElementById("profile-title").value,
        skills: skills.join(", "),
        summary: document.getElementById("profile-summary").value,
        rate: document.getElementById("profile-rate").value,
      };

      const message = validateInput(profile);
      if (message === "valid") {
        profiles.push(profile);
        localStorage.setItem("profiles", JSON.stringify(profiles));
        addRow(profile);
        formData.reset();
      } else {
        alert(message);
      }
    };

    fileReader.readAsText(profileSkillsInput.files[0]);
  };

  function addRow(profile) {
    const newRow = document.createElement("tr");

    Object.entries(profile).forEach(([key, value]) => {
      const newCell = document.createElement("td");

      if (key === "skills") {
        const skills = value.split(", ");
        skills.forEach((skill) => {
          const skillLabel = document.createElement("span");
          skillLabel.textContent = skill;
          skillLabel.className = "profile-skill";
          newCell.appendChild(skillLabel);
        });
      } else if (key === "summary") {
        newCell.textContent = value.slice(0, 100);
      } else {
        newCell.textContent = value;
      }

      newRow.appendChild(newCell);
    });
    const actionsCell = document.createElement("td");
    newRow.appendChild(actionsCell);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    actionsCell.appendChild(deleteButton);

    deleteButton.onclick = () => {
      profiles = profiles.filter((p) => p !== profile);
      localStorage.setItem("profiles", JSON.stringify(profiles));
      profilesTable.deleteRow(newRow.rowIndex);
    };

    editButton.onclick = () => {
      document.getElementById("profile-name").value = profile.name;
      document.getElementById("profile-title").value = profile.title;
      document.getElementById("profile-summary").value = profile.summary;
      document.getElementById("profile-rate").value = profile.rate;

      formData.onsubmit = (event) => {
        event.preventDefault();

        const profileSkillsInput = document.getElementById("profile-skills");
        const fileReader = new FileReader();

        fileReader.onload = () => {
          const skills = JSON.parse(fileReader.result).skill;

          const updatedProfile = {
            name: document.getElementById("profile-name").value,
            title: document.getElementById("profile-title").value,
            skills: skills.join(", "),
            summary: document.getElementById("profile-summary").value,
            rate: document.getElementById("profile-rate").value,
          };

          const message = validateInput(updatedProfile);
          if (message === "valid") {
            profiles = profiles.map((p) =>
              p === profile ? updatedProfile : p
            );
            localStorage.setItem("profiles", JSON.stringify(profiles));
            location.reload();
          } else {
            alert(message);
          }
        };

        fileReader.readAsText(profileSkillsInput.files[0]);
      };
    };

    profilesTable.appendChild(newRow);
  }

  function validateInput(profile) {
    const values = Object.values(profile);

    for (let i = 0; i < values.length; i++) {
      if (values[i].trim() === "") {
        return "All fields are required!";
      }
    }

    if (isNaN(profile.rate) || profile.rate < 0) {
      return "Profile rate must be a positive number!";
    }

    if (!profile.skills || profile.skills.split(", ").length === 0) {
      return "Skills should contain at least one item!";
    }

    return "valid";
  }
});
