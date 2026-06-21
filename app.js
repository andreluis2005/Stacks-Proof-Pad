const form = document.querySelector("#proof-form");
const builder = document.querySelector("#receipt-builder");
const memo = document.querySelector("#receipt-memo");
const time = document.querySelector("#receipt-time");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const builderName = String(data.get("builder") || "").trim();
  const proofMemo = String(data.get("memo") || "").trim();

  if (!builderName || !proofMemo) return;

  builder.textContent = builderName;
  memo.textContent = proofMemo;
  time.textContent = new Date().toISOString();
});
