# 🚀 ByxRuz Next.js Template

Template profesional para proyectos Next.js con las mejores prácticas y librerías más utilizadas.

## ✨ Características

- ⚡ **Next.js 14+** con App Router
- 🎨 **Tailwind CSS** + PostCSS configurado
- 🎭 **GSAP** con ScrollTrigger y plugins premium
- 🔥 **Lenis** smooth scroll integrado
- 🗄️ **Zustand** para state management
- 📱 **Responsive design** system
- 🎯 **TypeScript** configurado
- 🧩 **Componentes reutilizables**

## 🛠️ Componentes incluidos

### Core Components
- `SmoothScroll` - Lenis integrado con GSAP
- `TransitionWrapper` - Animaciones entre páginas
- `VirtualScrollBar` - Barra de scroll personalizada
- `NavMenu` - Navegación responsive

### Utilities
- `gsap-global.ts` - GSAP configurado globalmente
- Store con Zustand (Lenis + App state)
- Hooks personalizados optimizados

## 🚀 Inicio rápido

### Opción 1: Usar como template de GitHub
1. Click en "Use this template"
2. Nombra tu proyecto
3. Clona y ejecuta `npm install`

### Opción 2: Script automático
```bash
# Descargar template
npx create-next-app@latest mi-proyecto --example https://github.com/tuusuario/byxruz-template

# O clonar manualmente
git clone https://github.com/tuusuario/byxruz-template mi-proyecto
cd mi-proyecto
chmod +x setup-template.sh
./setup-template.sh
```

## 📁 Estructura del proyecto

```
src/
├── app/                    # App Router (Next.js 13+)
├── components/
│   ├── common/            # Componentes reutilizables
│   │   ├── smooth-scroll/ # Sistema de scroll
│   │   ├── nav-menu/      # Navegación
│   │   └── transition/    # Animaciones
│   └── ui/                # Componentes UI básicos
├── lib/                   # Utilidades y configuraciones
│   ├── gsap-global.ts    # GSAP configurado
│   └── utils.ts          # Funciones helper
├── store/                 # Zustand stores
│   ├── lenis.store.ts    # Control de Lenis
│   └── app.store.ts      # Estado global de la app
└── styles/               # Estilos globales
```

## ⚙️ Configuración

### Variables de entorno
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Personalización
1. **Colores**: Modifica `tailwind.config.js`
2. **Fuentes**: Configura en `app/layout.tsx`
3. **GSAP**: Añade plugins en `lib/gsap-global.ts`
4. **Animaciones**: Personaliza en `TransitionWrapper.tsx`

## 🎯 Scripts disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build para producción  
npm run start        # Servidor de producción
npm run lint         # Linting
npm run type-check   # Verificar TypeScript
```

## 🔧 Personalización avanzada

### Añadir nuevos stores
```typescript
// store/mi-store.ts
import { create } from 'zustand';

interface MiStore {
  valor: string;
  setValor: (valor: string) => void;
}

export const useMiStore = create<MiStore>((set) => ({
  valor: '',
  setValor: (valor) => set({ valor }),
}));
```

### Integrar nuevos plugins de GSAP
```typescript
// lib/gsap-global.ts
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);
export { TextPlugin };
```

## 📚 Ejemplos de uso

### Animación básica con GSAP
```typescript
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib";

export const MiComponente = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".animate-me", {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <div className="animate-me">Elemento 1</div>
      <div className="animate-me">Elemento 2</div>
    </div>
  );
};
```

### Control de Lenis
```typescript
import { useLenisStore } from "@/store";

export const MiComponente = () => {
  const { stopScroll, startScroll, scrollTo } = useLenisStore();

  return (
    <button onClick={() => scrollTo("#seccion", { duration: 2 })}>
      Ir a sección
    </button>
  );
};
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch
3. Commit tus cambios  
4. Push al branch
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 🙏 Créditos

- [GSAP](https://greensock.com/gsap/)
- [Lenis](https://github.com/studio-freight/lenis) 
- [Zustand](https://github.com/pmndrs/zustand)
- [Next.js](https://nextjs.org/)