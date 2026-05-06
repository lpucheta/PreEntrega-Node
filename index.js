const args = process.argv.slice(2);

const [metodo, proceso, ...producto] = args;


async function todosLosProductos(){
    try{
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

async function productoPorID(){
    try{
        const id = proceso.split("/")[1];
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        console.log(data);

    }catch(error){
        console.error("Error al obtener el producto por ID:", error);
    }
}


async function eliminarProducto(){
    try{
        const id = proceso.split("/")[1];
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.error("Error al eliminar el producto:", error);
    }
}


async function crearProducto(){
    try {
        const response = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title: producto[0], price: parseFloat(producto[1]), category: producto[2]})
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error al crear el producto:", error);
    } 
}

switch(metodo){
    case "GET":
        if(proceso.includes("/")){
            productoPorID();
        }else{
            todosLosProductos();
        }
        break;
    case "POST":
        crearProducto();
        break;
    case "DELETE":
        eliminarProducto();
        break;
    default:
        console.log("Metodo no reconocido");
}


