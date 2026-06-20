const guests = [
  { firstName: "George", lastName: "Boulos", table: "1", note: "Family table" },
  { firstName: "Anna", lastName: "Boulos", table: "1", note: "Family table" },
  { firstName: "Mariam", lastName: "Hanna", table: "4", note: "Garden Room" },
  { firstName: "Joseph", lastName: "Mansour", table: "7", note: "Near the dance floor" },
  { firstName: "Sarah", lastName: "Khalil", table: "9", note: "Blue Salon" },
  { firstName: "Michael", lastName: "Aziz", table: "12", note: "Terrace side" }
];

const form = document.querySelector("#seating-form");
const result = document.querySelector("#result");

const normalize = (value) =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const firstName = normalize(formData.get("firstName"));
  const lastName = normalize(formData.get("lastName"));

  const guest = guests.find(
    (person) =>
      normalize(person.firstName) === firstName &&
      normalize(person.lastName) === lastName
  );

  result.hidden = false;
  result.classList.toggle("error", !guest);

  if (guest) {
    result.innerHTML = `
      <p class="eyebrow">Welcome</p>
      <p class="guest-name">${guest.firstName} ${guest.lastName}</p>
      <div class="table">
        <span>Table</span>
        <strong>${guest.table}</strong>
      </div>
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
