import React, { useState, useEffect } from "react";
import { db } from '../firebase'; 
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";


function HolaUPSComponent ( {texto} ) {
    const [nombre, setNombre]=useState('');
    const [direccion, setDireccion]=useState('');
    const [lista, setLista] = useState([]);
    const [editId, setEditId] = useState(null);

    console.log("Renderizando componente HolaUPS");

    useEffect(() => {
        cargarDatos();
    }, []);

  async function cargarDatos() {
    try {
      const querySnapshot = await getDocs(collection(db, 'contactos'));
      const contactos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLista(contactos);
    } catch (error) {
      console.error("Error al cargar contactos:", error);
    }
  }

  async function guardar() {
    if (!nombre.trim() || !direccion.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    const registro = {
      nombre: nombre.trim(),
      direccion: direccion.trim()
    };

    try {
      if (editId) {
        // Actualizar documento existente
        const contactoRef = doc(db, 'contactos', editId);
        await updateDoc(contactoRef, registro);
        setEditId(null);
      } else {
        // Crear nuevo documento
        await addDoc(collection(db, 'contactos'), registro);
      }
      setNombre('');
      setDireccion('');
      await cargarDatos(); // recarga la lista
    } catch (error) {
      console.error("Error guardando contacto:", error);
    }
  }


  function editar(contacto) {
    setNombre(contacto.nombre);
    setDireccion(contacto.direccion);
    setEditId(contacto.id);
  }
    
  async function eliminar(id) {
      const contactoRef = doc(db, 'contactos', id);
      await deleteDoc(contactoRef);
      await cargarDatos();
    
  }
    
    return (
        <div>
            <h1> {texto} - Ecuador</h1>
            <form onSubmit={(e) => { e.preventDefault(); guardar(); }}>
                <label htmlFor ="txtNombre"> Nombre completo</label>
                <input id="txtNombre" type="text"
                    value={nombre} onChange = {(e) => setNombre(e.target.value)} />
                <label htmlFor="txtDireccion"> Direccion </label>
                <input id="txtDireccion" type="text"
                    value={direccion} onChange = {(e) => setDireccion(e.target.value)} />
                <button type="submit">{editId ? 'Actualizar' : 'Guardar'}</button>
            </form>
            <span>Hola {nombre}</span>

            <table border="1">
                <tbody>
                <tr>
                    <th>Nombre</th>
                    <th>Dirección</th>
                </tr>
                {lista.map((contacto) => (
                    <tr key={contacto.id}>
                    <td>{contacto.nombre}</td>
                    <td>{contacto.direccion}</td>
                    <td>
                        <button onClick={() => editar(contacto)}>Editar</button>
                        <button onClick={() => eliminar(contacto.id)}>Eliminar</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
    );
}

export default HolaUPSComponent;