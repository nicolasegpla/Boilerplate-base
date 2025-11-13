# 📘 Guía de Arquitectura de la Capa de Presentación (`presentation/`)

La carpeta `presentation/` contiene toda la lógica relacionada con la **Interfaz de Usuario**.  
Su propósito es ofrecer una separación clara entre UI, lógica de interacción, layouts, rutas y mecanismos de composición de vistas.

**Ningún elemento dentro de esta capa debe conocer lógica de dominio, casos de uso, repositorios o servicios externos.**

---

# 📁 Estructura General

```
presentation/
  components/
    atoms/
    molecules/
    organisms/
    templates/
    index.ts
  context/
  layouts/
  routes/
  styles/
  viewmodels/
  views/
```

Cada subcarpeta cumple con una responsabilidad específica, siguiendo Atomic Design, Presentational Pattern y el principio de separación de responsabilidades.

---

# 🧩 1. `components/`

### Propósito
Almacenar los componentes UI puramente presentacionales, siguiendo **Atomic Design**.

---

## 1.1. Atoms (`components/atoms/`)

Los **átomos** son los componentes UI más básicos del sistema.

### Ejemplos:
- `Input`
- `Label`
- `Button`
- `ErrorMessage`
- `Icon`

### Reglas:
- Sin lógica interna.
- Solo reciben props mínimas.
- Muy reutilizables.
- No contienen estado complejo.

---

## 1.2. Molecules (`components/molecules/`)

Una **molécula** es una composición de varios átomos funcionando como una unidad coherente.

### Ejemplos:
- `EmailField`
- `PasswordField`

### Reglas:
- Siguen siendo presentational.
- Contienen reglas menores de UI.
- No manejan estado global ni llaman servicios.

---

## 1.3. Organisms (`components/organisms/`)

Los **organismos** son bloques grandes de UI que contienen moléculas y átomos.

### Ejemplos:
- `LoginForm`
- `UserTable`

### Reglas:
- Presentational: **NO son Smart Components**.
- Reciben datos y callbacks desde el Container.
- Representan secciones completas de UI.

---

## 1.4. Templates (`components/templates/`)

Los **templates** definen la estructura visual general de una página, sin lógica.

### Ejemplos:
- `AuthTemplate`
- `DashboardTemplate`

### Reglas:
- Componen Organisms.
- No manejan lógica.
- No contienen estado.

---

## 1.5. `index.ts`

Archivo para barrel exports.

---

# 🧠 2. `context/`

### Propósito
Contextos globales de **UI** (no de negocio).

### Ejemplos válidos:
- Tema
- Idioma
- Sidebar abierto/cerrado

### Reglas:
- No manejar autenticación.
- No manejar lógica de dominio.
- No llamar casos de uso.

---

# 🏛️ 3. `layouts/`

### Propósito
Definir el layout global de la aplicación (Shell UI).

### Ejemplos:
- `MainLayout`
- `AuthLayout`

### Reglas:
- Sin lógica de negocio.
- Solo estructura visual.

---

# 🛣️ 4. `routes/`

### Propósito
Gestionar el árbol de rutas de la aplicación.

### Reglas:
- No mezclar lógica UI/domino.
- No renderizar componentes específicos.
- Solo configuración.

---

# 🎨 5. `styles/`

### Propósito
Centralizar estilos globales.

### Ejemplos:
- Variables CSS
- Reset
- Tipografías

---

# 🧩 6. `viewmodels/`

### Propósito
Adaptar datos de dominio → UI.

### Reglas:
- Funciones puras.
- No hacer fetch.
- No lógica de negocio.
- Crear modelos para presenters.

---

# 🖼️ 7. `views/`

### Propósito
Agrupar las vistas de la aplicación.  
Cada vista se divide en Presentational + Container:

```
FeaturePage.presenter.tsx  → Presentational
FeaturePage.container.tsx  → Smart Component
```

### El Presenter:
- No tiene lógica.
- Recibe props ya transformadas.
- Solo compone Templates y Organisms.

### El Container:
- Maneja estado.
- Ejecuta casos de uso.
- Mapea datos a ViewModels.

---

# 📌 Principios Generales

1. Los componentes presentacionales **no manejan lógica de negocio**.  
2. El estado vive en Containers o Context UI.  
3. Los Organisms **no deben ser Smart**.  
4. Los Molecules encapsulan composición repetitiva.  
5. Los Atoms son UI mínima sin lógica.  
6. Los ViewModels transforman datos para la UI.  
7. La capa de presentación **no conoce** dominio ni infraestructura.

---

# 🔚 Conclusión

Esta arquitectura garantiza:

- Reusabilidad  
- Escalabilidad  
- Testabilidad  
- Orden y mantenimiento a largo plazo  
- Separación estricta entre UI, lógica y dominio  

Lista para proyectos de nivel empresarial.
