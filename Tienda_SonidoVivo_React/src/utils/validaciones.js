// src/utils/validaciones.js

// 1. Encriptación SHA-256 (Mantenida intacta)
export async function encriptarPassword(pass) {
  const conversionBinario = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pass));
  return Array.from(new Uint8Array(conversionBinario))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// 2. Validación de formato de contraseña (Mantenida intacta)
export function validarPasswordFormat(password) {
  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  if (!/[A-Z]/.test(password)) {
    return "La contraseña debe contener al menos una letra mayúscula.";
  }
  if (!/[a-z]/.test(password)) {
    return "La contraseña debe contener al menos una letra minúscula.";
  }
  if (!/[0-9]/.test(password)) {
    return "La contraseña debe contener al menos un número.";
  }
  if (!/[-+!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "La contraseña debe contener al menos un carácter especial.";
  }
  if (/\s/.test(password)) {
    return "La contraseña no debe contener espacios.";
  }
  return null; // Formato correcto
}

// 3. Validación individual por campo (Adaptada a pnombre, apaterno, etc.)
export function validarCampo(name, value, formData, usuariosRegistrados = []) {
  if (!value || String(value).trim() === '') {
    return null; // No muestra errores visuales mientras la casilla está vacía
  }

  switch (name) {
    case 'pnombre':
    case 'snombre':
    case 'apaterno':
    case 'amaterno': {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(value)) {
        return "El campo debe contener solo letras y espacios";
      }
      if (value.length < 3 && (name === 'pnombre' || name === 'apaterno')) {
        return "El campo debe tener al menos 3 caracteres";
      }
      break;
    }

    case 'correo': {
      const dominioValido = 
        value.trim().toLowerCase().endsWith(".com") || 
        value.trim().toLowerCase().endsWith(".cl") || 
        value.trim().toLowerCase().endsWith(".org");
      if (!dominioValido) {
        return "Debe ingresar un correo válido (.com, .cl, .org)";
      }
      // Se mantiene tu validación contra el arreglo por si aún la necesitas
      const correoExistente = usuariosRegistrados.some(
        (u) => u.correo.trim().toLowerCase() === value.trim().toLowerCase()
      );
      if (correoExistente) {
        return "Ya existe una cuenta registrada con este correo electrónico";
      }
      break;
    }

    case 'password': {
      const errorFormat = validarPasswordFormat(value);
      if (errorFormat) return errorFormat;

      // Actualizado para comparar con los nuevos campos de nombre/correo
      if (
        value === formData.pnombre || 
        value === formData.apaterno || 
        value === formData.correo
      ) {
        return "La contraseña no debe ser igual a tus datos personales.";
      }
      if (value.toLowerCase().includes("password") || value.toLowerCase().includes("1234")) {
        return "La contraseña no debe contener palabras comunes como 'password' o secuencias como '1234'.";
      }
      break;
    }

    case 'repeatPassword': {
      if (value !== formData.password) {
        return "Las contraseñas no coinciden.";
      }
      break;
    }

    default:
      return null;
  }

  return null;
}

// 4. Validación estricta para el envío del formulario (onSubmit)
// Mantiene tu estructura original que devuelve { mensaje, campo }
export function validarRegistro(formData, usuariosRegistrados = []) {
  // Solo incluimos los campos que el backend necesita ahora
  const camposObligatorios = [
    { id: 'pnombre', label: 'Primer nombre' },
    { id: 'apaterno', label: 'Apellido paterno' },
    { id: 'correo', label: 'Correo electrónico' },
    { id: 'estiloMusical', label: 'Estilo musical' },
    { id: 'categoriaInstrumento', label: 'Categoría de instrumento' },
    { id: 'password', label: 'Contraseña' },
    { id: 'repeatPassword', label: 'Repetir contraseña' }
  ];

  // Paso A: Comprobar si hay algún campo obligatorio completamente vacío
  for (let c of camposObligatorios) {
    const valor = formData[c.id];
    if (!valor || String(valor).trim() === '') {
      return { 
        mensaje: `El campo "${c.label}" es obligatorio y no puede quedar vacío.`, 
        campo: c.id 
      };
    }
  }

  // Paso B: Si todo está rellenado, validar las reglas de negocio/formato
  for (let c of camposObligatorios) {
    const mensajeError = validarCampo(c.id, formData[c.id], formData, usuariosRegistrados);
    if (mensajeError) {
      return { mensaje: mensajeError, campo: c.id };
    }
  }

  return null; // Todo completo y válido
}