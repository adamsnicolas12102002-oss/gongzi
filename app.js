const STORAGE_KEY = "worker-survival-calculator:v1";

const defaults = {
  salary: 8000,
  expenses: {
    rent: 3000,
    commute: 500,
    food: 1500,
    credit: 800,
    pet: 300,
    game: 400
  },
  user: {
    name: "\u6253\u5de5\u4eba\u5c0f\u5f20",
    age: 24,
    city: "\u5317\u6f02",
    job: "\u4e92\u8054\u7f51\u642c\u7816",
    motto: "\u6d3b\u7740\u633a\u597d\n\u5176\u4ed6\u90fd\u662f\u9526\u4e0a\u6dfb\u82b1",
    avatar: ""
  }
};

const text = {
  adjust: "\u8c03\u8282",
  minus: "\u51cf\u5c11",
  plus: "\u589e\u52a0",
  yuan: "\u5143",
  cup: "\u676f"
};

const expenses = [
  { key: "rent", label: "\u623f\u79df", icon: "&#127968;", step: 100, className: "rent" },
  { key: "commute", label: "\u901a\u52e4", icon: "&#128652;", step: 50, className: "commute" },
  { key: "food", label: "\u5403\u996d", icon: "&#127836;", step: 100, className: "food" },
  { key: "credit", label: "\u82b1\u5457/\u4fe1\u7528\u5361", icon: "&#128179;", step: 100, className: "credit" },
  { key: "pet", label: "\u5ba0\u7269", icon: "&#128054;", step: 50, className: "pet" },
  { key: "game", label: "\u6e38\u620f\u5145\u503c", icon: "&#127918;", step: 50, className: "game" }
];

const state = loadState();
const elements = {};

function cloneDefaults() {
  return {
    salary: defaults.salary,
    expenses: { ...defaults.expenses },
    user: { ...defaults.user }
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      salary: Number(saved?.salary) || defaults.salary,
      expenses: { ...defaults.expenses, ...(saved?.expenses || {}) },
      user: { ...defaults.user, ...(saved?.user || {}) }
    };
  } catch {
    return cloneDefaults();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function money(value) {
  return Number(value).toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function createExpenseCards() {
  const grid = document.querySelector("#expenseGrid");
  grid.innerHTML = expenses
    .map(
      (item) => `
        <div class="expense-card ${item.className}">
          <div class="expense-top">
            <span class="expense-icon" aria-hidden="true">${item.icon}</span>
            <label for="${item.key}">${item.label}</label>
          </div>
          <input id="${item.key}" data-key="${item.key}" type="number" min="0" step="${item.step}" inputmode="numeric" />
          <div class="stepper" aria-label="${item.label}${text.adjust}">
            <button type="button" data-action="minus" data-key="${item.key}" aria-label="${text.minus}${item.label}">-</button>
            <span>.</span>
            <button type="button" data-action="plus" data-key="${item.key}" aria-label="${text.plus}${item.label}">+</button>
          </div>
        </div>
      `
    )
    .join("");
}

function bindElements() {
  [
    "salary",
    "salaryRange",
    "leftover",
    "leftoverText",
    "days",
    "daysHint",
    "risk",
    "riskBar",
    "riskText",
    "milkLevel",
    "stars",
    "milkCopy",
    "teaBudget",
    "teaCups",
    "profileName",
    "profileAge",
    "profileCity",
    "profileJob",
    "profileSalary",
    "profileMotto",
    "tipsList",
    "reportBadge",
    "dailySpend",
    "rentRatio",
    "expenseRatio",
    "reportCopy",
    "mineSalary",
    "mineLeftover",
    "mineRisk",
    "mineTitle",
    "editName",
    "editAge",
    "editCity",
    "editJob",
    "editMotto",
    "avatarInput",
    "portraitAvatar",
    "mineAvatarImage",
    "mineAvatarFallback"
  ].forEach((id) => {
    elements[id] = document.querySelector(`#${id}`);
  });
}

function renderInputs() {
  elements.salary.value = state.salary;
  elements.salaryRange.value = state.salary;
  const fill = ((state.salary - 1000) / 49000) * 100;
  elements.salaryRange.style.setProperty("--fill", `${clamp(fill, 0, 100)}%`);

  expenses.forEach((item) => {
    document.querySelector(`#${item.key}`).value = state.expenses[item.key];
  });
}

function renderUserInputs() {
  elements.editName.value = state.user.name;
  elements.editAge.value = state.user.age;
  elements.editCity.value = state.user.city;
  elements.editJob.value = state.user.job;
  elements.editMotto.value = state.user.motto;
}

function renderAvatar() {
  const hasAvatar = Boolean(state.user.avatar);
  elements.portraitAvatar.hidden = !hasAvatar;
  elements.mineAvatarImage.hidden = !hasAvatar;
  elements.mineAvatarFallback.hidden = hasAvatar;
  if (hasAvatar) {
    elements.portraitAvatar.src = state.user.avatar;
    elements.mineAvatarImage.src = state.user.avatar;
  } else {
    elements.portraitAvatar.removeAttribute("src");
    elements.mineAvatarImage.removeAttribute("src");
  }
}

function getProfile(leftover, risk) {
  const rentRatio = state.expenses.rent / Math.max(state.salary, 1);
  if (leftover < 0) {
    return {
      age: 24,
      city: rentRatio > 0.45 ? "\u5317\u6f02" : "\u94b1\u5305\u9ed1\u6d1e",
      job: "\u4e92\u8054\u7f51\u642c\u7816",
      motto: "\u4eba\u5728\u5de5\u4f4d\u5750\n\u503a\u4ece\u5929\u4e0a\u6765",
      name: "\u900f\u652f\u578b\u6253\u5de5\u4eba"
    };
  }
  if (risk >= 70) {
    return {
      age: 24,
      city: rentRatio > 0.35 ? "\u6caa\u6f02" : "\u57ce\u4e2d\u6751",
      job: "\u9879\u76ee\u7eed\u547d\u5e08",
      motto: "\u6d3b\u7740\u633a\u597d\n\u5176\u4ed6\u90fd\u662f\u9526\u4e0a\u6dfb\u82b1",
      name: "\u6708\u5149\u65cf\u672c\u65cf"
    };
  }
  if (leftover > state.salary * 0.35) {
    return {
      age: 26,
      city: "\u7406\u8d22\u65b0\u624b\u6751",
      job: "\u7701\u94b1\u7b56\u5212",
      motto: "\u4eca\u5929\u6ca1\u4e71\u82b1\n\u660e\u5929\u5c31\u6709\u5149",
      name: "\u6512\u94b1\u9884\u5907\u5f79"
    };
  }
  return {
    age: 25,
    city: rentRatio > 0.3 ? "\u901a\u52e4\u8fb9\u7f18" : "\u666e\u901a\u6253\u5de5",
    job: "\u9884\u7b97\u534f\u8c03\u5458",
    motto: "\u80fd\u7701\u4e00\u70b9\n\u5c31\u662f\u8d5a\u4e00\u70b9",
    name: "\u8c28\u614e\u6d88\u8d39\u578b"
  };
}

function getMilkLevel(leftover) {
  const cups = Math.max(0, Math.floor(leftover / 25));
  if (cups >= 16) {
    return {
      level: "\u5976\u8336\u5c0f\u5bcc\u8c6a",
      stars: 5,
      copy: "\u60f3\u559d\u5c31\u559d\uff0c\u73cd\u73e0\u6930\u679c\u90fd\u80fd\u52a0\u3002",
      budget: 400
    };
  }
  if (cups >= 9) {
    return {
      level: "\u534a\u7cd6\u81ea\u7531\u9009\u624b",
      stars: 4,
      copy: "\u5076\u5c14\u70b9\u5927\u676f\uff0c\u5fc3\u91cc\u4e5f\u4e0d\u592a\u75bc\u3002",
      budget: 240
    };
  }
  if (cups >= 5) {
    return {
      level: "\u8c28\u614e\u52a0\u6599\u7fa4\u4f17",
      stars: 3,
      copy: "\u52a0\u6599\u524d\u4f1a\u5148\u770b\u770b\u4f59\u989d\u3002",
      budget: 130
    };
  }
  if (cups >= 2) {
    return {
      level: "\u5976\u8336\u8fb9\u7f18\u5f98\u5f8a",
      stars: 2,
      copy: "\u60f3\u559d\uff0c\u4f46\u4f1a\u7b49\u7b2c\u4e8c\u676f\u534a\u4ef7\u3002",
      budget: 70
    };
  }
  return {
    level: "\u8d2b\u6c11\u7a9f\u5976\u8336\u9009\u624b",
    stars: 1,
    copy: "\u6bcf\u676f\u5976\u8336\u90fd\u5728\u8d1f\u7f6a\u611f\u4e2d\u559d\u4e0b\u53bb...",
    budget: Math.max(0, Math.min(50, leftover))
  };
}

function getTips(leftover, risk) {
  if (leftover < 0) {
    return [
      "\u5148\u505c\u6389\u975e\u5fc5\u8981\u5145\u503c\uff0c\u522b\u8ba9\u7f3a\u53e3\u7ee7\u7eed\u957f",
      "\u628a\u82b1\u5457\u62c6\u51fa\u6765\u770b\uff0c\u522b\u548c\u751f\u6d3b\u8d39\u6df7\u5728\u4e00\u8d77",
      "\u8fd9\u5468\u5148\u505a\u996d\uff0c\u5916\u5356\u9884\u7b97\u6309\u5929\u5c01\u9876"
    ];
  }
  if (risk >= 70) {
    return [
      "\u8bb0\u8d26\u662f\u7b2c\u4e00\u6b65\uff0c\u7701\u94b1\u662f\u7b2c\u4e8c\u6b65",
      "\u8bd5\u7740\u81ea\u5df1\u505a\u996d\uff0c\u6bcf\u6708\u80fd\u7701\u4e0b\u4e00\u4e2a\u4ebf",
      "\u5c11\u70b9\u5916\u5356\u5976\u8336\uff0c\u4f60\u4f1a\u53d1\u73b0\u4e16\u754c\u66f4\u7f8e\u597d"
    ];
  }
  if (risk >= 40) {
    return [
      "\u56fa\u5b9a\u652f\u51fa\u5148\u9501\u4f4f\uff0c\u5269\u4e0b\u7684\u94b1\u6309\u5468\u5206\u914d",
      "\u6bcf\u5468\u7559\u4e00\u7b14\u5feb\u4e50\u9884\u7b97\uff0c\u522b\u9760\u610f\u5fd7\u529b\u786c\u6491",
      "\u6708\u5e95\u524d\u522b\u51b2\u52a8\u5f00\u4f1a\u5458"
    ];
  }
  return [
    "\u4fdd\u6301\u8fd9\u4e2a\u8282\u594f\uff0c\u6708\u5e95\u8fd8\u6709\u547c\u5438\u611f",
    "\u628a\u7ed3\u4f59\u5148\u5b58\u8d77\u6765\u4e00\u90e8\u5206",
    "\u5956\u52b1\u53ef\u4ee5\u6709\uff0c\u4f46\u522b\u8ba9\u5956\u52b1\u53d8\u8d26\u5355"
  ];
}

function getReportCopy(leftover, risk, rentRatio) {
  if (leftover < 0) {
    return "\u672c\u6708\u5df2\u7ecf\u51fa\u73b0\u8d64\u5b57\uff0c\u5148\u628a\u6e38\u620f\u5145\u503c\u548c\u989d\u5916\u6d88\u8d39\u6309\u4e0b\u6682\u505c\u952e\u3002";
  }
  if (rentRatio >= 0.4) {
    return "\u623f\u79df\u538b\u529b\u504f\u9ad8\uff0c\u4f60\u4e0d\u662f\u4e0d\u52aa\u529b\uff0c\u662f\u5f00\u5c40\u5c31\u88ab\u6263\u4e86\u4e00\u5927\u683c\u8840\u3002";
  }
  if (risk >= 70) {
    return "\u94b1\u5305\u8fd8\u80fd\u547c\u5438\uff0c\u4f46\u5916\u5356\u3001\u5976\u8336\u548c\u4f1a\u5458\u5f97\u6536\u4e00\u6536\u3002";
  }
  if (risk >= 40) {
    return "\u8fd9\u4e2a\u6708\u8fd8\u7b97\u7a33\uff0c\u628a\u5269\u4f59\u91d1\u989d\u6309\u5468\u62c6\u5f00\uff0c\u5c31\u4e0d\u5bb9\u6613\u6708\u5e95\u5d29\u76d8\u3002";
  }
  return "\u672c\u6708\u8282\u594f\u4e0d\u9519\uff0c\u5148\u5b58\u4e00\u7b14\u5c0f\u94b1\uff0c\u518d\u5b89\u6392\u5feb\u4e50\u9884\u7b97\u3002";
}

function calculate() {
  const total = Object.values(state.expenses).reduce((sum, value) => sum + Number(value || 0), 0);
  const leftover = state.salary - total;
  const dailyCost = Math.max(1, Math.round((state.expenses.food + state.expenses.commute) / 30));
  const days = leftover <= 0 ? 0 : Math.min(99, Math.floor(leftover / dailyCost));
  const expenseRatio = total / Math.max(state.salary, 1);
  const rentPressure = state.expenses.rent / Math.max(state.salary, 1);
  const risk = clamp(Math.round(expenseRatio * 72 + rentPressure * 26 + (leftover < 0 ? 22 : 0)), 0, 99);
  const milk = getMilkLevel(leftover);
  const profile = getProfile(leftover, risk);
  const dailySpend = Math.max(0, Math.floor(leftover / 30));

  elements.leftover.textContent = money(leftover);
  elements.leftoverText.textContent =
    leftover < 0
      ? "\u7206\u7ea2\u9884\u8b66\uff0c\u5feb\u5239\u8f66!"
      : leftover < 1000
        ? "\u522b\u614c\uff0c\u8fd8\u80fd\u6491\u4f4f!"
        : "\u8fd8\u6709\u4f59\u7cae\uff0c\u7a33\u4f4f!";
  elements.days.textContent = days;
  elements.daysHint.textContent =
    days <= 3 ? "\u5efa\u8bae\u9a6c\u4e0a\u6536\u7f29\u5f00\u652f" : days <= 12 ? "\u5982\u679c\u4e0d\u5403\u4e0d\u559d" : "\u6309\u57fa\u7840\u5f00\u9500\u4f30\u7b97";
  elements.risk.textContent = risk;
  elements.riskBar.style.width = `${risk}%`;
  elements.riskText.textContent =
    risk >= 80 ? "\u26a0 \u975e\u5e38\u5371\u9669" : risk >= 55 ? "\u26a0 \u6709\u70b9\u60ac" : risk >= 30 ? "\u25b3 \u52c9\u5f3a\u5b89\u5168" : "\u2713 \u672c\u6708\u7a33\u4e86";

  elements.milkLevel.textContent = milk.level;
  elements.stars.innerHTML = Array.from({ length: 5 }, (_, index) => `<span class="${index < milk.stars ? "on" : "off"}">&#9733;</span>`).join("");
  elements.milkCopy.textContent = milk.copy;
  elements.teaBudget.textContent = `${Math.round(milk.budget)}${text.yuan}`;
  elements.teaCups.textContent = `${Math.max(0, Math.floor(milk.budget / 25))}${text.cup}`;

  elements.profileName.textContent = state.user.name;
  elements.profileAge.textContent = state.user.age;
  elements.profileCity.textContent = state.user.city;
  elements.profileJob.textContent = state.user.job;
  elements.profileSalary.textContent = state.salary;
  elements.profileMotto.innerHTML = state.user.motto.replace(/\n/g, "<br />");
  document.querySelector(".photo-card b").textContent = `# ${profile.name} #`;
  elements.mineTitle.textContent = state.user.name;
  elements.mineAvatarFallback.textContent = state.user.name.trim().charAt(0) || "\u6253";

  elements.tipsList.innerHTML = getTips(leftover, risk).map((tip) => `<li>${tip}</li>`).join("");
  elements.reportBadge.textContent =
    risk >= 80 ? "\u672c\u6708\u72b6\u6001\uff1a\u975e\u5e38\u5371\u9669" : risk >= 55 ? "\u672c\u6708\u72b6\u6001\uff1a\u6709\u70b9\u60ac" : "\u672c\u6708\u72b6\u6001\uff1a\u52c9\u5f3a\u5b89\u5168";
  elements.dailySpend.textContent = `${dailySpend}${text.yuan}`;
  elements.rentRatio.textContent = `${Math.round(rentPressure * 100)}%`;
  elements.expenseRatio.textContent = `${Math.round(expenseRatio * 100)}%`;
  elements.reportCopy.textContent = getReportCopy(leftover, risk, rentPressure);
  elements.mineSalary.textContent = state.salary;
  elements.mineLeftover.textContent = Math.round(leftover);
  elements.mineRisk.textContent = `${risk}%`;
}

function updateSalary(value) {
  state.salary = clamp(Math.round(Number(value) || defaults.salary), 1000, 50000);
  saveState();
  renderInputs();
  calculate();
}

function updateExpense(key, value) {
  state.expenses[key] = clamp(Math.round(Number(value) || 0), 0, 99999);
  saveState();
  renderInputs();
  calculate();
}

function updateUserFromForm() {
  state.user.name = elements.editName.value.trim() || defaults.user.name;
  state.user.age = clamp(Math.round(Number(elements.editAge.value) || defaults.user.age), 16, 80);
  state.user.city = elements.editCity.value.trim() || defaults.user.city;
  state.user.job = elements.editJob.value.trim() || defaults.user.job;
  state.user.motto = elements.editMotto.value.trim() || defaults.user.motto;
  saveState();
  calculate();
}

function fileToImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function resizeAvatar(file) {
  const image = await fileToImage(file);
  const size = 512;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = size;
  const scale = Math.max(size / image.width, size / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  const x = (size - width) / 2;
  const y = (size - height) / 2;
  context.drawImage(image, x, y, width, height);
  return canvas.toDataURL("image/jpeg", 0.82);
}

function bindEvents() {
  elements.salary.addEventListener("input", (event) => updateSalary(event.target.value));
  elements.salaryRange.addEventListener("input", (event) => updateSalary(event.target.value));

  document.querySelector("#expenseGrid").addEventListener("input", (event) => {
    const key = event.target.dataset.key;
    if (key) updateExpense(key, event.target.value);
  });

  document.querySelector("#expenseGrid").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const item = expenses.find((expense) => expense.key === button.dataset.key);
    const direction = button.dataset.action === "plus" ? 1 : -1;
    updateExpense(item.key, state.expenses[item.key] + direction * item.step);
  });

  document.querySelector("#resetBtn").addEventListener("click", () => {
    state.salary = defaults.salary;
    state.expenses = { ...defaults.expenses };
    saveState();
    renderInputs();
    calculate();
  });

  document.querySelector("#aboutBtn").addEventListener("click", () => {
    document.querySelector("#aboutDialog").showModal();
  });

  document.querySelector("#profileForm").addEventListener("input", updateUserFromForm);

  elements.avatarInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    state.user.avatar = await resizeAvatar(file);
    saveState();
    renderAvatar();
    calculate();
    event.target.value = "";
  });

  document.querySelector(".bottom-nav").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-tab]");
    if (!button) return;
    switchTab(button.dataset.tab);
  });
}

function switchTab(tabName) {
  const pages = {
    calculator: document.querySelector("#calculatorPage"),
    report: document.querySelector("#reportPage"),
    guide: document.querySelector("#guidePage"),
    mine: document.querySelector("#minePage")
  };

  Object.entries(pages).forEach(([name, page]) => {
    page.hidden = name !== tabName;
  });

  document.querySelectorAll(".bottom-nav button").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

createExpenseCards();
bindElements();
renderInputs();
renderUserInputs();
renderAvatar();
bindEvents();
calculate();
