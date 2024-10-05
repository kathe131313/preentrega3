// Definición del Objeto rangosNormales para tener los rangos min y max de cada tipo de estudio
const rangosNormales = {
    'Vitamina D': { min: 30, max: 100 },
    'Glucosa': { min: 0.70, max: 1.10 },
    'TSH': { min: 0.40, max: 4.00 },
    'Triglicéridos': { min: 0, max: 150 },
    'Glóbulos Rojos': { min: 4.0, max: 6.0 },
    'Colesterol': { min: 0, max: 200 }
};


// Array de objetos para almacenar los datos de los análisis de sangre, son datos reales
const analisisSangre = [
    { fecha: '2018-08-17', tipoEstudio: 'Vitamina D', resultado: 25.2},
    { fecha: '2018-08-17', tipoEstudio: 'Glucosa', resultado: 0.77},
    { fecha: '2018-08-17', tipoEstudio: 'TSH', resultado: 2.80},
    { fecha: '2018-08-17', tipoEstudio: 'Triglicéridos', resultado:68},
    { fecha: '2018-08-17', tipoEstudio: 'Glóbulos Rojos', resultado: 4.79},
    { fecha: '2018-08-17', tipoEstudio: 'Colesterol', resultado: 94.0},
    { fecha: '2019-11-11', tipoEstudio: 'Vitamina D', resultado: 28.2},
    { fecha: '2019-11-11', tipoEstudio: 'Glucosa', resultado: 0.80},
    { fecha: '2019-11-11', tipoEstudio: 'TSH', resultado: 2.38},
    { fecha: '2019-11-11', tipoEstudio: 'Triglicéridos', resultado:98},
    { fecha: '2019-11-11', tipoEstudio: 'Glóbulos Rojos', resultado: 5.04},
    { fecha: '2019-11-11', tipoEstudio: 'Colesterol', resultado: 140},
    { fecha: '2022-10-11', tipoEstudio: 'Vitamina D', resultado: 29.2},
    { fecha: '2022-10-11', tipoEstudio: 'Glucosa', resultado: 0.83},
    { fecha: '2022-10-11', tipoEstudio: 'TSH', resultado: 1.81},
    { fecha: '2022-10-11', tipoEstudio: 'Triglicéridos', resultado: 85},
    { fecha: '2022-10-11', tipoEstudio: 'Glóbulos Rojos', resultado: 4.58},
    { fecha: '2022-10-11', tipoEstudio: 'Colesterol', resultado: 141.0},
    { fecha: '2023-07-19', tipoEstudio: 'Vitamina D', resultado: 32.3},
    { fecha: '2023-07-19', tipoEstudio: 'Glucosa', resultado: 0.86},
    { fecha: '2023-07-19', tipoEstudio: 'TSH', resultado: 4.207},
    { fecha: '2023-07-19', tipoEstudio: 'Triglicéridos', resultado: 40},
    { fecha: '2023-07-19', tipoEstudio: 'Glóbulos Rojos', resultado: 4.58},
    { fecha: '2023-07-19', tipoEstudio: 'Colesterol', resultado: 157.0},
    { fecha: '2023-12-18', tipoEstudio: 'Vitamina D', resultado: 31.0},
    { fecha: '2023-12-18', tipoEstudio: 'Glucosa', resultado: 0.90},
    { fecha: '2023-12-18', tipoEstudio: 'TSH', resultado: 2.791},
    { fecha: '2023-12-18', tipoEstudio: 'Triglicéridos', resultado: 66},
    { fecha: '2023-12-18', tipoEstudio: 'Glóbulos Rojos', resultado: 4.72},
    { fecha: '2023-12-18', tipoEstudio: 'Colesterol', resultado: 150.0},
];

// Función para mostrar resultados por fecha
function mostrarPorFecha() {
    const fecha = prompt('Introduce la fecha (YYYY-MM-DD):');
    const resultados = analisisSangre.filter(estudio => estudio.fecha === fecha);
    
    if (resultados.length > 0) {
        let mensaje = 'Resultados para la fecha ' + fecha + ':\n';
        resultados.forEach(estudio => {
            mensaje += `${estudio.tipoEstudio}: ${estudio.resultado}\n`;
        });
        alert(mensaje);
    } else {
        alert('No se encontraron resultados para la fecha ingresada.');
    }
}

// Función para mostrar todos los estudios por tipo
function mostrarPorTipo() {
    const tipo = prompt('Introduce el tipo de estudio: (Ej: Vitamina D, Glucosa, TSH, Trigliseridos, Glóbulos rojos, Colesterol)');
    const resultados = analisisSangre.filter(estudio => estudio.tipoEstudio.toLowerCase() === tipo.toLowerCase());
    
    if (resultados.length > 0) {
        let mensaje = 'Resultados para el tipo de estudio ' + tipo + ':\n';
        let sumaResultados = 0; // Variable para la suma de los resultados

        resultados.forEach(estudio => {
            const rango = rangosNormales[estudio.tipoEstudio];
            let estado;

            if (rango) {
                if (estudio.resultado < rango.min) {
                    estado = 'Bajo';
                } else if (estudio.resultado > rango.max) {
                    estado = 'Alto';
                } else {
                    estado = 'Normal';
                }
            } else {
                estado = 'Sin referencia';
            }

            mensaje += `Fecha: ${estudio.fecha}, Resultado: ${estudio.resultado} (${estado})\n`;
            sumaResultados += estudio.resultado; // Acumular el resultado para el promedio
        });
        alert(mensaje);
        // Calcular el promedio
        const promedio = sumaResultados / resultados.length;
        alert(`Promedio de ${tipo}: ${promedio.toFixed(2)}`);

        
    } else {
        alert('No se encontraron resultados para el tipo de estudio ingresado.');
    }
}


// Función para mostrar gráfico comparativo
let grafico; // Variable global para almacenar la instancia del gráfico

function mostrarGraficoPorTipo() {
    const tipoEstudio = prompt('Introduce el tipo de estudio (Ej: Vitamina D, Glucosa, TSH, Triglicéridos, Glóbulos Rojos, Colesterol):').trim().toLowerCase();
    const ctx = document.getElementById('graficoEstudios').getContext('2d');

    // Normalizamos las claves del objeto rangosNormales
    const rangosNormalesNormalizados = Object.keys(rangosNormales).reduce((acc, key) => {
        acc[key.toLowerCase()] = rangosNormales[key];
        return acc;
    }, {});

    // Verificamos si el tipo de estudio ingresado está en rangosNormales
    const rango = rangosNormalesNormalizados[tipoEstudio] || { min: 'N/A', max: 'N/A' }; // Si no está, ponemos 'N/A' para indicar que no se encontró

    const datosPorFecha = analisisSangre.filter(estudio => estudio.tipoEstudio.toLowerCase() === tipoEstudio);

    // Preparar datos para el gráfico
    const etiquetas = datosPorFecha.map(estudio => estudio.fecha);
    const datos = datosPorFecha.map(estudio => estudio.resultado);

    // Si ya existe un gráfico, destrúyelo
    if (grafico) {
        grafico.destroy(); // Destruir el gráfico anterior
    }

    // Limpiar el canvas antes de crear un nuevo gráfico
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Crear el gráfico usando Chart.js
    grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [
                {
                    label: `Resultados de ${tipoEstudio}`,
                    data: datos,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: `Valor mínimo (${rango.min})`,
                    data: new Array(datos.length).fill(rango.min),
                    type: 'line',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0 // Sin puntos en la línea
                },
                {
                    label: `Valor máximo (${rango.max})`,
                    data: new Array(datos.length).fill(rango.max),
                    type: 'line',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0 // Sin puntos en la línea
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Calcular el promedio para mostrar en un alert
    const sumaResultados = datos.reduce((acc, val) => acc + val, 0);
    const promedio = sumaResultados / datos.length;
    alert(`Promedio de ${tipoEstudio}: ${promedio.toFixed(2)}`);
}






