const guests = [
  { firstName: "Gina", lastName: "Boulos", table: "Head table", note: "Bride & Groom table" },
  { firstName: "Jacob", lastName: "Lawrence", table: "head Table", note: "Bride & Groom table" },
  { firstName: "Anna", lastName: "Lawrence", table: "1", note: "Family Table" },
  { firstName: "Britney", lastName: "Strange", table: "1", note: "Family Table" },
  { firstName: "Stella", lastName: "Strange", table: "1", note: "Family Table" },
  { firstName: "Walter", lastName: "Strange", table: "1", note: "Family Table" },
  { firstName: "Fady", lastName: "Boulos", table: "1", note: "Family Table" },
  { firstName: "Sophia", lastName: "Boulos", table: "1", note: "Family Table" },
  { firstName: "Meera", lastName: "Boulos", table: "1", note: "Family Table" },
  { firstName: "Sameh", lastName: "Basali", table: "1", note: "Family Table" },
  { firstName: "Patrick", lastName: "Akhnoukh", table: "1", note: "Family Table" },
  { firstName: "Pretty", lastName: "Akhnoukh", table: "1", note: "Family Table" },
  { firstName: "Emmanuel", lastName: "Akhnoukh", table: "1", note: "Family Table" },
  { firstName: "Matthew", lastName: "Akhnoukh", table: "1", note: "Family Table" },
  { firstName: "Chris", lastName: "Basali", table: "1", note: "Family Table" },
  { firstName: "Kavin", lastName: "Strange", table: "1", note: "Family Table" },
  { firstName: "Refat", lastName: "Boulos", table: "1", note: "Family Table" },
  { firstName: "Samia", lastName: "Boulos", table: "1", note: "Family Table" },
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
