const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
}

const contactForm = document.getElementById('contact-form');

if (contactForm) {

    const campos = {
        nombre: { input: document.getElementById('nombre'), error: document.getElementById('nombre-error') },
        email: { input: document.getElementById('email'), error: document.getElementById('email-error') },
        asunto: { input: document.getElementById('asunto'), error: document.getElementById('asunto-error') },
        mensaje: { input: document.getElementById('mensaje'), error: document.getElementById('mensaje-error') }
    };

    function esEmailValido(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function limpiarError(campo) {
        campo.error.textContent = '';
        campo.input.classList.remove('error');
    }

    function mostrarError(campo, mensaje) {
        campo.error.textContent = mensaje;
        campo.input.classList.add('error');
    }

    function validarCampo(nombre) {
        const campo = campos[nombre];
        const valor = campo.input.value.trim();

        if (valor === '') {
            mostrarError(campo, `El campo ${nombre} es obligatorio`);
            return false;
        }

        if (nombre === 'email' && !esEmailValido(valor)) {
            mostrarError(campo, 'Por favor, ingrese un email válido');
            return false;
        }

        limpiarError(campo);
        return true;
    }

    Object.keys(campos).forEach(nombre => {
        const campo = campos[nombre];
        
        campo.input.addEventListener('blur', () => validarCampo(nombre));
        
        campo.input.addEventListener('input', () => {
            if (campo.input.classList.contains('error')) {
                if (nombre === 'email') {
                    if (esEmailValido(campo.input.value.trim())) {
                        limpiarError(campo);
                    }
                } else if (campo.input.value.trim() !== '') {
                    limpiarError(campo);
                }
            }
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const todosValidos = Object.keys(campos).every(nombre => validarCampo(nombre));
        
        if (todosValidos) {
            alert('Mensaje enviado exitosamente!');
            contactForm.reset();
            Object.keys(campos).forEach(nombre => limpiarError(campos[nombre]));
        }
    });
}
