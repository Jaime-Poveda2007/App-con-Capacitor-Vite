import "./styles.css";

console.log("App iniciada correctamente 🚀");

// ELEMENTOS
const entrada = document.getElementById("entrada");
const nombreInput = document.getElementById("nombre");
const monedaSelect = document.getElementById("moneda");

const lista = document.getElementById("lista");
const totalElem = document.getElementById("total");

const presupuestoElem = document.getElementById("presupuesto");
const restanteElem = document.getElementById("restante");

// VARIABLES
let gastos = [];
let total = 0;
let presupuesto = 0;

// ------ AGREGAR GASTO ------
window.agregar = () => {
  const nombre = nombreInput.value.trim();
  const valor = parseFloat(entrada.value);
  const moneda = monedaSelect.value;

  if (!nombre || isNaN(valor)) return;

  const gasto = {
    id: Date.now(),
    nombre,
    valor,
    moneda,
  };

  gastos.push(gasto);

  guardarLocal();
  renderLista();

  nombreInput.value = "";
  entrada.value = "";
};

// ------ PINTAR LISTA ------
function renderLista() {
  lista.innerHTML = "";
  total = 0;

  gastos.forEach((gasto) => {
    total += gasto.valor;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${gasto.nombre}</strong> — ${gasto.valor} ${gasto.moneda}
      <button class="edit" onclick="editarGasto(${gasto.id})">✏️</button>
      <button class="delete" onclick="eliminarGasto(${gasto.id})">🗑️</button>
    `;
    lista.appendChild(li);
  });

  totalElem.textContent = total;
  actualizarRestante();
}

// ------ ELIMINAR ------
window.eliminarGasto = (id) => {
  gastos = gastos.filter((g) => g.id !== id);
  guardarLocal();
  renderLista();
};

// ------ EDITAR ------
window.editarGasto = (id) => {
  const gasto = gastos.find((g) => g.id === id);

  const nuevoNombre = prompt("Nuevo nombre:", gasto.nombre);
  const nuevoValor = parseFloat(prompt("Nuevo valor:", gasto.valor));

  if (!nuevoNombre || isNaN(nuevoValor)) return;

  gasto.nombre = nuevoNombre;
  gasto.valor = nuevoValor;

  guardarLocal();
  renderLista();
};

// ------ PRESUPUESTO ------
presupuestoElem.addEventListener("change", () => {
  presupuesto = parseFloat(presupuestoElem.value) || 0;
  guardarLocal();
  actualizarRestante();
});

function actualizarRestante() {
  const restante = presupuesto - total;
  restanteElem.textContent = `Restante: ${restante}`;

  restanteElem.style.color = restante < 0 ? "red" : "green";
}

// ------ LOCAL STORAGE ------
function guardarLocal() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
  localStorage.setItem("presupuesto", presupuesto);
}

function cargarLocal() {
  gastos = JSON.parse(localStorage.getItem("gastos")) || [];
  presupuesto = parseFloat(localStorage.getItem("presupuesto")) || 0;

  presupuestoElem.value = presupuesto;
  renderLista();
}

cargarLocal();
