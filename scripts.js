const form = document.getElementById("transactionForm");
const namaItemInput = document.getElementById("namaItem");
const jumlahInput = document.getElementById("jumlah");
const kategoriInput = document.getElementById("kategori");
const formMessage = document.getElementById("formMessage");
const totalSaldoElement = document.getElementById("totalSaldo");
const transactionList = document.getElementById("transactionList");
const chartCanvas = document.getElementById("expenseChart");

const categoryColors = {
  Makanan: "#ff9f43",
  Transportasi: "#2e86ab",
  Hiburan: "#8e6c88"
};

const transactions = [];

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

const expenseChart = new Chart(chartCanvas, {
  type: "pie",
  data: {
    labels: Object.keys(categoryColors),
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: Object.values(categoryColors),
        borderWidth: 0
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 18,
          font: {
            family: "Plus Jakarta Sans"
          }
        }
      }
    }
  }
});

function renderTransactions() {
  if (transactions.length === 0) {
    transactionList.innerHTML = '<li class="empty-state">Belum ada transaksi. Tambahkan data untuk mulai melacak pengeluaran.</li>';
    return;
  }

  transactionList.innerHTML = "";

  transactions.forEach((transaction) => {
    const item = document.createElement("li");
    item.className = "transaction-item";

    const left = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = transaction.nama;

    const meta = document.createElement("p");
    meta.className = "transaction-meta";
    meta.textContent = transaction.kategori;

    left.append(title, meta);

    const right = document.createElement("div");
    right.className = "transaction-right";

    const amount = document.createElement("span");
    amount.className = "transaction-amount";
    amount.textContent = currencyFormatter.format(transaction.jumlah);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.dataset.id = transaction.id;
    deleteButton.setAttribute("aria-label", `Hapus ${transaction.nama}`);
    deleteButton.textContent = "Hapus";

    right.append(amount, deleteButton);
    item.append(left, right);
    transactionList.append(item);
  });
}

function updateSaldo() {
  const total = transactions.reduce((sum, transaction) => sum + transaction.jumlah, 0);
  totalSaldoElement.textContent = currencyFormatter.format(total);
}

function updateChart() {
  const categoryTotals = {
    Makanan: 0,
    Transportasi: 0,
    Hiburan: 0
  };

  transactions.forEach((transaction) => {
    categoryTotals[transaction.kategori] += transaction.jumlah;
  });

  expenseChart.data.datasets[0].data = Object.keys(categoryColors).map(
    (category) => categoryTotals[category]
  );
  expenseChart.update();
}

function refreshUI() {
  renderTransactions();
  updateSaldo();
  updateChart();
}

function resetForm() {
  form.reset();
  namaItemInput.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const nama = namaItemInput.value.trim();
  const jumlah = Number(jumlahInput.value);
  const kategori = kategoriInput.value;

  if (!nama || !jumlah || jumlah <= 0 || !kategori) {
    formMessage.textContent = "Semua field wajib diisi dengan nilai yang valid.";
    return;
  }

  transactions.unshift({
    id: crypto.randomUUID(),
    nama,
    jumlah,
    kategori
  });

  formMessage.textContent = "";
  refreshUI();
  resetForm();

  munculinKucing();
});

transactionList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-btn");

  if (!deleteButton) {
    return;
  }

  const { id } = deleteButton.dataset;
  const transactionIndex = transactions.findIndex((transaction) => transaction.id === id);

  if (transactionIndex === -1) {
    return;
  }

  transactions.splice(transactionIndex, 1);
  refreshUI();
});

refreshUI();

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  const kiri = document.querySelector(".kiri-atas");
  const kanan = document.querySelector(".kanan-bawah");

  // kiri atas gerak pelan
  kiri.style.transform = `translate(${scrollY * 0.05}px, ${scrollY * 0.05}px)`;

  // kanan bawah gerak kebalik (biar aesthetic)
  kanan.style.transform = `translate(-${scrollY * 0.05}px, -${scrollY * 0.05}px)`;
});

function munculinKucing() {
  const container = document.getElementById("cat-container");

  for (let i = 0; i < 10; i++) {
    const cat = document.createElement("img");
    cat.src = "https://cdn-icons-png.flaticon.com/512/616/616408.png"; // gambar kucing
    cat.classList.add("cat");

    cat.style.left = Math.random() * 100 + "vw";
    cat.style.animationDuration = (2 + Math.random() * 2) + "s";

    container.appendChild(cat);

    setTimeout(() => {
      cat.remove();
    }, 3000);
  }
}