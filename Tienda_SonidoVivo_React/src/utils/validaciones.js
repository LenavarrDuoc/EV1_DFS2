// src/utils/validaciones.js

// 1. Encriptación SHA-256
export async function encriptarPassword(pass) {
  const conversionBinario = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pass));
  return Array.from(new Uint8Array(conversionBinario))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// 2. Validación de formato de contraseña (Reutilizable en Login y Registro)
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

// 3. Validación individual por campo
export function validarCampo(name, value, formData, usuariosRegistrados = []) {
  if (!value || value.trim() === '') {
    return null; // No muestra errores visuales mientras la casilla está vacía
  }

  switch (name) {
    case 'nombre': {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(value)) {
        return "El nombre debe contener letras y espacios";
      }
      if (value.length < 3) {
        return "El nombre debe tener al menos 3 caracteres";
      }
      break;
    }

    case 'run': {
      if (!/^[0-9kK-]+$/.test(value)) {
        return "El RUN debe contener solo números, guión y dígito verificador";
      }
      if (value.length < 9 || value.length > 10) {
        return "El RUN debe tener entre 9 y 10 caracteres";
      }
      const dvValido = 
        value.slice(-2)[0] === "-" && 
        (value.trim().slice(-1).toUpperCase() === "K" || !isNaN(value.trim().slice(-1)));
      if (!dvValido) {
        return "El RUN debe terminar en - y un dígito verificador válido (0 a 9 o K)";
      }
      break;
    }

    case 'correo': {
      const dominioValido = 
        value.trim().toLowerCase().endsWith(".com") || 
        value.trim().toLowerCase().endsWith(".cl") || 
        value.trim().toLowerCase().endsWith(".org");
      if (!dominioValido) {
        return "Debe ingresar un correo válido";
      }
      const correoExistente = usuariosRegistrados.some(
        (u) => u.correo.trim().toLowerCase() === value.trim().toLowerCase()
      );
      if (correoExistente) {
        return "Ya existe una cuenta registrada con este correo electrónico";
      }
      break;
    }

    case 'telefono': {
      if (!/^[0-9+]+$/.test(value)) {
        return "El teléfono debe contener solo números y el signo +";
      }
      if (value.length !== 12 || !value.startsWith("+")) {
        return "El teléfono debe tener 12 caracteres e iniciar con +";
      }
      break;
    }

    case 'fecNac': {
      const fecha = new Date(value + "T00:00:00");
      const anio = fecha.getFullYear();
      const fechaActual = new Date();
      const difAnios = fechaActual.getFullYear() - anio;
      const difMeses = fecha.getMonth() - fechaActual.getMonth();
      const difDias = fecha.getDate() - fechaActual.getDate();

      if (anio < 1900 || fecha > fechaActual) {
        return "Debe ingresar una fecha de nacimiento inferior a la fecha actual";
      }
      if (difAnios < 18 || (difAnios === 18 && (difMeses > 0 || (difMeses === 0 && difDias > 0)))) {
        return "Debe ser mayor de edad para registrarse.";
      }
      break;
    }

    case 'password': {
      const errorFormat = validarPasswordFormat(value);
      if (errorFormat) return errorFormat;

      if (
        value === formData.nombre || 
        value === formData.run || 
        value === formData.correo || 
        value === formData.telefono || 
        value === formData.fecNac
      ) {
        return "La contraseña no debe ser igual a ninguno de los otros campos.";
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
export function validarRegistro(formData, usuariosRegistrados) {
  const camposObligatorios = [
    { id: 'nombre', label: 'Nombre completo' },
    { id: 'run', label: 'RUN' },
    { id: 'correo', label: 'Correo electrónico' },
    { id: 'telefono', label: 'Teléfono' },
    { id: 'fecNac', label: 'Fecha de nacimiento' },
    { id: 'direccion', label: 'Dirección' },
    { id: 'comuna', label: 'Comuna' },
    { id: 'estiloMusical', label: 'Estilo musical' },
    { id: 'categoriaInstrumento', label: 'Categoría de instrumento' },
    { id: 'password', label: 'Contraseña' },
    { id: 'repeatPassword', label: 'Repetir contraseña' }
  ];

  // Paso A: Comprobar si hay algún campo obligatorio completamente vacío
  for (let c of camposObligatorios) {
    const valor = formData[c.id];
    if (!valor || valor.trim() === '') {
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