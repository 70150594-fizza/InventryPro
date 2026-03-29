import { initialInventory } from '../database/items.js';

let inventory = [...initialInventory]; // Task 2-i [cite: 36]

// --- View Switcher Logic ---
const showDashboard = () => {
    document.getElementById('dashboardView').classList.remove('hidden-view');
    document.getElementById('formView').classList.add('hidden-view');
};

const showForm = () => {
    document.getElementById('dashboardView').classList.add('hidden-view');
    document.getElementById('formView').classList.remove('hidden-view');
};

// --- CRUD: Read [cite: 42] ---
const renderUI = (data) => {
    const grid = document.getElementById('itemGrid');
    grid.innerHTML = data.map(item => {
        // String Methods 
        const cleanName = item.name.trim(); // 1
        const upperName = cleanName.toUpperCase(); // 2
        const lowerCat = item.category.toLowerCase(); // 3
        const capCat = lowerCat.charAt(0).toUpperCase() + lowerCat.slice(1); // 4, 5
        const strId = "SKU-".concat(item.id.toString().padStart(5, '0')); // 6, 7, 8
        const priceFmt = `$${item.price}`.replace(".00", ""); // 9
        const isPromo = item.name.includes("Sale"); // 10

        return `
        <div class="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-b-8 border-pink-500">
            <span class="text-[10px] font-bold text-pink-400">${strId}</span>
            <h3 class="text-2xl font-black dark:text-white mt-1">${upperName}</h3>
            <p class="text-gray-400 mb-6">${capCat}</p>
            <div class="flex justify-between items-center">
                <span class="text-3xl font-black text-pink-600">${priceFmt}</span>
                <div class="flex gap-2">
                    <button onclick="editItem('${item.id}')" class="p-2 bg-pink-50 text-pink-600 rounded-lg">✏️</button>
                    <button onclick="deleteItem('${item.id}')" class="p-2 bg-red-50 text-red-600 rounded-lg">🗑️</button>
                </div>
            </div>
        </div>`;
    }).join('');
};

// --- CRUD: Create & Update [cite: 41, 43] ---
document.getElementById('inventoryForm').onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const category = document.getElementById('itemCategory').value;

    if (id) {
        const idx = inventory.findIndex(i => i.id == id);
        inventory[idx] = { ...inventory[idx], name, price, category }; // Task 5 [cite: 61]
    } else {
        inventory.push({ id: Date.now().toString(), name, price, category }); // Task 2-iii-a [cite: 41]
    }
    document.getElementById('inventoryForm').reset();
    showDashboard();
    renderUI(inventory);
};

// --- CRUD: Delete [cite: 44] ---
window.deleteItem = (id) => {
    if(confirm("Delete item?")) {
        inventory = inventory.filter(i => i.id != id);
        renderUI(inventory);
    }
};

// --- Search & Filters (Task 3) [cite: 55, 56] ---
document.getElementById('searchInput').oninput = (e) => {
    const term = e.target.value.toLowerCase().trim();
    const filtered = inventory.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.category.toLowerCase().includes(term) ||
        item.price.toString().includes(term)
    );
    renderUI(filtered);
};

window.editItem = (id) => {
    const item = inventory.find(i => i.id == id);
    document.getElementById('editId').value = item.id;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemCategory').value = item.category;
    document.getElementById('formTitle').innerText = "Update Product";
    showForm();
};

// Event Listeners
document.getElementById('showFormBtn').onclick = () => {
    document.getElementById('formTitle').innerText = "Add New Product";
    document.getElementById('editId').value = "";
    showForm();
};
document.getElementById('backBtn').onclick = showDashboard;

renderUI(inventory);