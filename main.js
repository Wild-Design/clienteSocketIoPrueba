import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

const socket = io('http://localhost:9000');

const button = document.getElementById('button');
const tbody = document.getElementById('tbody');
const contador = document.getElementById('contador');
const trBody = document.querySelectorAll('.trBody');

const REGISTRO = {
  ESTADO: 'estado',
  COCHE: 'coche',
  RAMAL: 'ramal',
  SALIDA: 'salida',
  LLEGADA: 'llegada',
};

button.addEventListener('click', () => {
  socket.emit('message', 'Hola soy el saludito de otro cliente');
});

socket.on('message', (message) => {
  //Aquí escucho el mensaje que biene de los otros clientes que son diferentes
  /*O sea, por ejemplo en el boton de arriba cada que doy click se envia un mensaje
    al backend y el backend devuelve el mensaje a los clientes que son diferentes
*/
  console.log(message);
  const number = parseInt(contador.textContent);
  contador.textContent = number + 1;
});

socket.on('addNewRegister', (message) => {
  console.log(message);
  tbody.innerHTML = '';
  fetch('http://localhost:9000')
    .then((res) => res.json())
    .then((registros) => {
      for (let i = 0; i < registros.length; i++) {
        const fila = document.createElement('tr');
        fila.classList.add('trBody');
        for (const prop in registros[i]) {
          const celda = document.createElement('td');
          if (Object.values(REGISTRO).includes(prop)) {
            celda.textContent = registros[i][prop];
            fila.appendChild(celda);
          }
        }
        tbody.appendChild(fila);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

fetch('http://localhost:9000')
  .then((res) => res.json())
  .then((registros) => {
    for (let i = 0; i < registros.length; i++) {
      const fila = document.createElement('tr');
      fila.classList.add('trBody');
      for (const prop in registros[i]) {
        const celda = document.createElement('td');
        if (Object.values(REGISTRO).includes(prop)) {
          celda.textContent = registros[i][prop];
          fila.appendChild(celda);
        }
      }
      tbody.appendChild(fila);
    }
  })
  .catch((error) => {
    console.log(error);
  });
