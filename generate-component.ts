/* eslint-disable no-undef */
/// <reference types="bun" />

import { writeFile, mkdir } from 'fs/promises';
import { existsSync, appendFileSync } from 'fs';
import { join, resolve } from 'path';

// Utilidad para convertir PascalCase a kebab-case
function toKebabCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Generador principal
async function generateComponent(name: string, targetDir: string) {
    const componentName = name;
    const kebabName = toKebabCase(componentName);
    const basePath = resolve('src', targetDir, componentName);

    if (existsSync(basePath)) {
        console.error(`❌ La carpeta "${basePath}" ya existe.`);
        return;
    }

    await mkdir(basePath, { recursive: true });

    // 1. Componente React básico con SCSS importado
    const componentCode = `import './${kebabName}.scss';

interface ${componentName}Props {
    // Agregá tus props acá
}

export function ${componentName}({}: ${componentName}Props) {
    return (
        <div className="${kebabName}">
            <h2>${componentName} works!</h2>
        </div>
    );
}
`;

    // 2. Archivo de estilos SCSS
    const scssCode = `@import '@/presentation/styles/index.scss';

.${kebabName} {
    // Estilos del componente
}
`;

    // 3. Historia de Storybook básica
    const storyCode = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
    title: '${targetDir}/${componentName}',
    component: ${componentName},
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Primary: Story = {
    args: {},
};
`;

    // 4. Paths de los archivos a crear
    const componentPath = join(basePath, `${componentName}.tsx`);
    const scssPath = join(basePath, `${kebabName}.scss`);
    const storyPath = join(basePath, `${componentName}.stories.tsx`);
    const barrelPath = join(resolve('src', targetDir), 'index.ts');

    // 5. Escribir archivos
    await writeFile(componentPath, componentCode);
    await writeFile(scssPath, scssCode);
    await writeFile(storyPath, storyCode);

    // 6. Actualizar barrel (index.ts)
    const exportLine = `export * from './${componentName}';\n`;
    appendFileSync(barrelPath, exportLine);

    console.log(`✅ Componente "${componentName}" generado en "src/${targetDir}/${componentName}"`);
}

// ------------------------------
// Leer argumentos
const [name, targetDir] = Bun.argv.slice(2);

if (!name || !targetDir) {
    console.error('❌ Usá: bun run generate-component NombreComponente carpeta/destino');
    process.exit(1);
}

generateComponent(name, targetDir);
