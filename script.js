const form = document.querySelector("#seating-form");
const result = document.querySelector("#result");
const normalize = (value) => value.trim().toLowerCase().replace(/\s+/g, " ");
let guests = [];

const parseCSV = (csvText) => {
  const lines = csvText.trim().split(/\r?\n/);
  const headers = lines.shift().split(",").map((header) => header.trim());

  return lines.map((line) => {
    const values = line.split(",").map((value) => value.trim());

    return headers.reduce((guest, header, index) => {
      guest[header] = values[index] || "";
      return guest;
    }, {});
  });
};

const loadGuests = async () => {
  const response = await fetch("guests.csv");
  const csvText = await response.text();
  guests = parseCSV(csvText);
};

loadGuests();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const firstName = normalize(formData.get("firstName"));
  const lastName = normalize(formData.get("lastName"));

  if (!guests.length) {
    result.hidden = false;
    result.classList.add("error");
    result.innerHTML = `
      <p class="eyebrow">Please Wait</p>
      <p class="guest-name">Guest list is loading</p>
      <p class="note">Try again in a moment.</p>
    `;
    return;
  }

  const guest = guests.find((person) => (
    normalize(person.firstName) === firstName &&
    normalize(person.lastName) === lastName
  ));

  result.hidden = false;
  result.classList.toggle("error", !guest);

  if (guest) {
    result.innerHTML = `
      <p class="eyebrow">Welcome</p>
      <p class="guest-name">${guest.firstName} ${guest.lastName}</p>
      <div class="table"><span>Table</span><strong>${guest.table}</strong></div>
      <p class="note">${guest.note || "We are so happy you are here."}</p>
    `;
    return;
  }

  result.innerHTML = `
    <p class="eyebrow">Guest Not Found</p>
    <p class="guest-name">Please check the spelling</p>
    <p class="note">A member of the wedding team can help you find your table.</p>
  `;
});
