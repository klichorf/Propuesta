#include <iostream>  // Nos ayuda a mostrar mensajes en la pantalla y a leer datos del teclado
#include <cstdlib>   // Nos da herramientas para hacer números aleatorios, como si tiráramos dados
#include <ctime>     // Nos da la hora actual para hacer que los números aleatorios cambien cada vez que corremos el programa
#include <algorithm> // Nos da herramientas útiles para trabajar con listas, como encontrar el número más grande en una lista

    // ¿Qué es una Clase?
    // Imagina que tienes una caja de juguetes.
    // En esa caja, tienes instrucciones sobre cómo construir diferentes tipos de juguetes: coches, casas, robots, etc. 
    // Cada conjunto de instrucciones es como una "plantilla" o "plano" que te dice cómo hacer un juguete específico.
    
    // ¿Qué es un Objeto?
    // Imagina que tienes una caja de juguetes y que en esa caja tienes varios juguetes diferentes, como coches, robots, y casas de muñecas.
    // Cada juguete es especial y tiene características únicas, pero todos ellos se hicieron siguiendo instrucciones de una plantilla.
    //
    // En programación, un objeto es como uno de esos juguetes. Es algo que usamos y que tiene sus propias características y habilidades,
    // siguiendo las instrucciones de una plantilla llamada clase.

    
using namespace std;

    // Clase Matriz: se encarga de manejar una tabla de 4 filas y 4 columnas para hacer operaciones con ella
    class Matriz {
    protected:
        int mat[4][4];  // Esta es nuestra tabla de 4x4, donde guardamos los números
        bool matrizGenerada = false;  // Este es un indicador que dice si hemos llenado la tabla con números

public:
    // Este método llena la matriz con números aleatorios entre 0 y 100
    // Imagina que queremos llenar nuestra tabla de 4x4 con números mágicos que cambian cada vez
    
    void llenarAleatorio() {
        // Prepara la "máquina de números aleatorios" usando la hora actual
        srand(static_cast<unsigned>(time(0)));
    
        // Recorre cada fila de la tabla
        for (int i = 0; i < 4; i++) {
            // Recorre cada columna de la fila actual
            for (int j = 0; j < 4; j++) {
                // Rellena la celda actual con un número aleatorio entre 0 y 100
                mat[i][j] = rand() % 101;
            }
        }
        // Marca que la tabla está llena de números aleatorios
        matrizGenerada = true;
    }


    // Este método muestra la matriz en la pantalla
    // Imagina que la matriz es una tabla de 4 filas y 4 columnas
    
    void mostrarMatriz() const {
        // Recorre cada fila de la tabla
        for (int i = 0; i < 4; i++) {
            // Recorre cada columna de la fila actual
            for (int j = 0; j < 4; j++) {
                // Muestra el número de la celda actual con un espacio entre celdas
                cout << mat[i][j] << "\t";
            }
            // Después de mostrar todos los números de una fila, empieza una nueva línea
            cout << endl;
        }
    }


    // Este método nos da una "flecha" que apunta a nuestra matriz 4x4.
    // Imagina que la matriz es como una hoja con 4 filas y 4 columnas.
    // Este método nos devuelve una "flecha" que apunta a la primera fila de esa hoja.
    int (*obtenerMatriz())[4] {
        // Aquí estamos diciendo: "Devuélveme la flecha que apunta a la primera fila de la hoja".
        return mat;
    }
    
    // Este método revisa si hemos creado la tabla con números
    bool estaGenerada() const {
        // Devuelve si la tabla ya está llena de números o no
        return matrizGenerada;
    }
};

// Clase Transponer: ayuda a cambiar filas por columnas en una tabla
class Transponer {
protected:
    int matTranspuesta[4][4];  // Esta es una nueva tabla donde guardamos el resultado después de hacer el cambio

public:
    // Método para cambiar filas por columnas en una tabla 4x4
    void transponer(int matriz[4][4]) {
        // Mira cada fila y columna de la tabla original
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                // Cambia el lugar de los números: fila se convierte en columna
                matTranspuesta[i][j] = matriz[j][i];
            }
        }
    }

    // Método para mostrar la nueva tabla con filas cambiadas por columnas
    void mostrarTranspuesta() const {
        // Mira cada fila y columna de la nueva tabla
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                // Muestra el número en la nueva tabla
                cout << matTranspuesta[i][j] << "\t";
            }
            // Después de mostrar una fila, empieza una nueva línea
            cout << endl;
        }
    }
};

    // Clase Calculadora: hace operaciones con la tabla, como sumar filas, columnas y diagonales 
    // La clase Calculadora es como una nueva caja de juguetes que quiere usar las instrucciones de dos cajas diferentes.
    // La clase Calculadora obtiene todo lo que sabe hacer la clase Matriz y también todo lo que sabe hacer la clase Transponer.
    
    // La clase Calculadora hereda de las clases Matriz y Transponer
class Calculadora : public Matriz, public Transponer {
    // Aquí dentro, Calculadora puede usar todos los métodos y datos de Matriz y Transponer
    // Esto significa que puede construir y mostrar matrices (de Matriz) y también puede transponer (cambiar filas por columnas) matrices (de Transponer)

    
public:
    // Suma todos los números en una fila específica
    int sumarFila(int fila) const {
        int suma = 0;
        // Recorre todos los números de la fila dada y los suma
        for (int i = 0; i < 4; i++) {
            suma += mat[fila][i];
        }
        return suma; // Devuelve la suma
    }

    // Suma todos los números en una columna específica
    int sumarColumna(int columna) const {
        int suma = 0;
        // Recorre todos los números de la columna dada y los suma
        for (int i = 0; i < 4; i++) {
            suma += mat[i][columna];
        }
        return suma; // Devuelve la suma
    }

    // Suma todos los números en la diagonal principal
    int sumarDiagonalPrincipal() const {
        int suma = 0;
        // Recorre todos los números de la diagonal principal y los suma
        for (int i = 0; i < 4; i++) {
            suma += mat[i][i];
        }
        return suma; // Devuelve la suma
    }

    // Suma todos los números en la diagonal secundaria
    int sumarDiagonalSecundaria() const {
        int suma = 0;
        // Recorre todos los números de la diagonal secundaria y los suma
        for (int i = 0; i < 4; i++) {
            suma += mat[i][3 - i];
        }
        return suma; // Devuelve la suma
    }

    // Calcula el promedio de todos los números en la tabla
    double calcularPromedio() const {
        int suma = 0;
        // Recorre todos los números de la tabla y los suma
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                suma += mat[i][j];
            }
        }
        // Divide la suma por 16 (el total de números) para obtener el promedio
        return suma / 16.0;
    }
};

       // Esta es la parte principal del programa donde se hacen las cosas
    int main() {
        Calculadora calc;  // Creamos una nueva "calculadora" que nos ayudará a hacer matemáticas con la tabla
        int opcion;  // Aquí guardamos la elección que hace el usuario en el menú
        bool transpuestaGenerada = false;  // Esto nos dice si hemos cambiado la tabla (filas por columnas) o no
        // Menú interactivo para el usuario
        
    do {
        cout << "\nMenú:\n";
        cout << "1. Rellenar matriz con valores aleatorios\n";
        cout << "2. Mostrar matriz\n";
        cout << "3. Obtener la transpuesta de la matriz\n";
        cout << "4. Realizar operaciones (sumas, mayor, promedio)\n";
        cout << "5. Salir\n";
        cout << "Ingrese su opción: ";
        cin >> opcion;

        switch (opcion) {
            case 1:
                calc.llenarAleatorio();  // Llama a la función para llenar la matriz
                transpuestaGenerada = false;  // Resetea el estado de la transposición
                cout << "Matriz rellenada.\n";
                break;
            case 2:
                if (calc.estaGenerada()) {
                    cout << "Matriz original:\n";
                    calc.mostrarMatriz();  // Muestra la matriz original
                    if (transpuestaGenerada) {
                        cout << "\nMatriz transpuesta:\n";
                        calc.mostrarTranspuesta();  // Muestra la transpuesta solo si ya se generó
                    }
                } else {
                    cout << "No se ha ejecutado la opción 1, no hay matriz para mostrar.\n";
                }
                break;
            case 3:
                if (calc.estaGenerada()) {
                    calc.transponer(calc.obtenerMatriz());  // Genera la matriz transpuesta
                    transpuestaGenerada = true;  // Marca que la transpuesta ha sido generada
                    cout << "La matriz ha sido transpuesta, use la opción 2 para verla.\n";
                } else {
                    cout << "No se ha ejecutado la opción 1, no hay matriz para transponer.\n";
                }
                break;
            case 4:
                if (calc.estaGenerada()) {
                    // Muestra resultados de varias operaciones con la matriz
                    cout << "Suma de fila 1: " << calc.sumarFila(0) << endl;
                    cout << "Suma de columna 1: " << calc.sumarColumna(0) << endl;
                    cout << "Suma de la diagonal principal: " << calc.sumarDiagonalPrincipal() << endl;
                    cout << "Suma de la diagonal secundaria: " << calc.sumarDiagonalSecundaria() << endl;
                    cout << "Promedio de los elementos de la matriz: " << calc.calcularPromedio() << endl;
                } else {
                    cout << "No se ha ejecutado la opción 1, no hay matriz para operar.\n";
                }
                break;
            case 5:
                cout << "Programa terminado.\n";
                break;
            default:
                cout << "Opción no válida, por favor intente de nuevo.\n";
        }
    } while (opcion != 5);  // El programa se repite hasta que el usuario elija salir

    return 0;  // Fin del programa
}