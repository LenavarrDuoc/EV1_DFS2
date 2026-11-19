// 1. Encriptación SHA-256 (Mantenida por si se requiere localmente)
export async function encriptarPassword(pass) {
  const conversionBinario = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pass));
  return Array.from(new Uint8Array(conversionBinario))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// 2. Validación de formato de contraseña
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
  return null; 
}

// 3. Validación individual por campo
export function validarCampo(name, value, formData, usuariosRegistrados = []) {
  if (!value || String(value).trim() === '') {
    return null; 
  }

  switch (name) {
    case 'run': {
      if (!/^[0-9]+-[0-9kK]{1}$/.test(value)) {
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
      
      const correoExistente = usuariosRegistrados.some(
        (u) => u.correo.trim().toLowerCase() === value.trim().toLowerCase()
      );
      if (correoExistente) {
        return "Ya existe una cuenta registrada con este correo electrónico";
      }
      break;
    }

    case 'fechaNacimiento': {
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
        value === formData.pnombre || 
        value === formData.apaterno || 
        value === formData.correo ||
        value === formData.run
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
export function validarRegistro(formData, usuariosRegistrados = []) {
  const errores = {};

  const camposObligatorios = [
    { id: 'run', label: 'RUN' },
    { id: 'pnombre', label: 'Primer nombre' },
    { id: 'apaterno', label: 'Apellido paterno' },
    { id: 'correo', label: 'Correo electrónico' },
    { id: 'fechaNacimiento', label: 'Fecha de nacimiento' },
    { id: 'direccion', label: 'Dirección' },
    { id: 'comuna', label: 'Comuna' },
    { id: 'estiloMusical', label: 'Estilo musical' },
    { id: 'categoriaInstrumento', label: 'Categoría de instrumento' },
    { id: 'password', label: 'Contraseña' },
    { id: 'repeatPassword', label: 'Repetir contraseña' }
  ];

  for (let c of camposObligatorios) {
    const valor = formData[c.id];
    if (!valor || String(valor).trim() === '') {
      errores[c.id] = `El campo "${c.label}" es obligatorio.`;
    }
  }

  for (let c of camposObligatorios) {
    if (!errores[c.id]) {
      const mensajeError = validarCampo(c.id, formData[c.id], formData, usuariosRegistrados);
      if (mensajeError) {
        errores[c.id] = mensajeError;
      }
    }
  }

  return errores; 
}