// src/tests/validaciones.test.js
import { 
  validarPasswordFormat, 
  encriptarPassword, 
  validarCampo, 
  validarRegistro 
} from '../utils/validaciones';

describe('Suite de Pruebas Unitarias - Módulo de Validaciones y Seguridad', () => {

  // TC-01: Formato correcto de contraseña
  it('TC-01: Debe retornar null cuando la contraseña cumple todos los requisitos de formato', () => {
    // 1. Arrange
    const passwordValida = "SonidoVivo2026!";

    // 2. Act
    const resultado = validarPasswordFormat(passwordValida);

    // 3. Assert
    expect(resultado).toBeNull();
  });

  // TC-02: Rechazo de contraseña sin caracteres especiales
  it('TC-02: Debe rechazar una contraseña que no contenga al menos un carácter especial', () => {
    // 1. Arrange
    const passwordSinEspecial = "SonidoVivo2026";

    // 2. Act
    const resultado = validarPasswordFormat(passwordSinEspecial);

    // 3. Assert
    expect(resultado).toBe("La contraseña debe contener al menos un carácter especial.");
  });

  // TC-03: Encriptación SHA-256 consistente
  it('TC-03: Debe generar un hash SHA-256 hexadecimal válido de 64 caracteres', async () => {
    // 1. Arrange
    const clavePlana = "Admin123!";

    // 2. Act
    const hashObtenido = await encriptarPassword(clavePlana);

    // 3. Assert
    expect(hashObtenido).toHaveLength(64);
    expect(hashObtenido).toMatch(/^[a-f0-9]{64}$/);
  });

  // TC-04: Nombre con caracteres inválidos
  it('TC-04: Debe retornar error si el campo nombre contiene números o símbolos', () => {
    // 1. Arrange
    const nombreInvalido = "Juan Perez123";

    // 2. Act
    const resultado = validarCampo('nombre', nombreInvalido, {});

    // 3. Assert
    expect(resultado).toBe("El nombre debe contener letras y espacios");
  });

  // TC-05: Formato de RUN chileno
  it('TC-05: Debe rechazar un RUN que no tenga el guión o largo adecuado', () => {
    // 1. Arrange
    const runInvalido = "123456789";

    // 2. Act
    const resultado = validarCampo('run', runInvalido, {});

    // 3. Assert
    expect(resultado).toBe("El RUN debe terminar en - y un dígito verificador válido (0 a 9 o K)");
  });

  // TC-06: Mayoría de edad
  it('TC-06: Debe rechazar la fecha de nacimiento de un usuario menor de 18 años', () => {
    // 1. Arrange
    const fechaMenorEdad = "2016-05-15";

    // 2. Act
    const resultado = validarCampo('fecNac', fechaMenorEdad, {});

    // 3. Assert
    expect(resultado).toBe("Debe ser mayor de edad para registrarse.");
  });

  // TC-07: Correo duplicado
  it('TC-07: Debe detectar si un correo ya existe en la lista de usuarios registrados', () => {
    // 1. Arrange
    const correoExistente = "cliente@sonidovivo.cl";
    const usuariosRegistradosMock = [
      { correo: "cliente@sonidovivo.cl", nombre: "Juan" }
    ];

    // 2. Act
    const resultado = validarCampo('correo', correoExistente, {}, usuariosRegistradosMock);

    // 3. Assert
    expect(resultado).toBe("Ya existe una cuenta registrada con este correo electrónico");
  });

  // TC-08: Coincidencia de contraseñas
  it('TC-08: Debe retornar error si la confirmación de contraseña no coincide con la original', () => {
    // 1. Arrange
    const formDataMock = { password: "ClaveSegura123!" };
    const repeatPasswordDiferente = "ClaveDistinta123!";

    // 2. Act
    const resultado = validarCampo('repeatPassword', repeatPasswordDiferente, formDataMock);

    // 3. Assert
    expect(resultado).toBe("Las contraseñas no coinciden.");
  });

  // TC-09: Campos obligatorios en registro completo
  it('TC-09: Debe detener el registro indicando el campo omitido si un valor obligatorio está vacío', () => {
    // 1. Arrange
    const formDataIncompleto = {
      nombre: '',
      run: '19876543-2',
      correo: 'test@sonidovivo.cl',
      telefono: '+56912345678',
      fecNac: '1995-04-12',
      direccion: 'Av. Siempre Viva 123',
      comuna: 'Santiago',
      estiloMusical: 'Rock',
      categoriaInstrumento: 'Guitarras',
      password: 'Password123!',
      repeatPassword: 'Password123!'
    };

    // 2. Act
    const errorObtenido = validarRegistro(formDataIncompleto, []);

    // 3. Assert
    expect(errorObtenido).not.toBeNull();
    expect(errorObtenido.campo).toBe('nombre');
  });

  // TC-10: Restricción de contraseñas que coinciden con datos personales
  it('TC-10: Debe rechazar la contraseña si coincide exactamente con el nombre u otro dato personal', () => {
    // 1. Arrange: Un nombre que cumple formato de clave y una contraseña idéntica
    const formDataMock = {
      nombre: "CarlosPerez123!",
      run: "18765432-1",
      correo: "carlos@sonidovivo.cl"
    };
    const passwordIgualAlNombre = "CarlosPerez123!";

    // 2. Act
    const resultado = validarCampo('password', passwordIgualAlNombre, formDataMock);

    // 3. Assert
    expect(resultado).toBe("La contraseña no debe ser igual a ninguno de los otros campos.");
  });

});