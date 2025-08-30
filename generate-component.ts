/* eslint-disable no-undef */
/// <reference types="bun" />

import { writeFile, mkdir } from 'fs/promises';
import { existsSync, appendFileSync } from 'fs';
import { join, resolve } from 'path';

// Utilidad para convertir PascalCase a kebab-case
function toKebabCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Utilidad para Extraer la url necesaria para el title de la historia de storybook

function extractAfterSrc(url) {
    const srcIndex = url.indexOf('src/');
    if (srcIndex === -1) {
        return null; // o retorna la URL completa si prefieres
    }
    return url.substring(srcIndex + 4); // +4 para saltar "src/"
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
    // add your props here
}

export const ${componentName} = ({}: ${componentName}Props) => {
    return (
        <div className="${kebabName}">
            <h2>${componentName} works!</h2>
        </div>
    );
};
`;

    // 2. Archivo de estilos SCSS
    const scssCode = `@use '@/presentation/styles/index.scss' as *;

.${kebabName} {
    // Components styles
}
`;

    // 3. Historia de Storybook básica
    const storyCode = `import type { Meta, StoryObj } from '@storybook/react';

import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
    title: '${extractAfterSrc(targetDir)}/${componentName}',
    component: ${componentName},
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Primary: Story = {
    args: {},
};
`;
    //4. test basico con vitest
    const testCode = `import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ${componentName} } from './${componentName}';

describe('<${componentName} />', () => {
    it('should render without crashing', () => {
        render(<${componentName} />);
        expect(screen.getByText('${componentName} works!')).toBeInTheDocument();
    });
});
`;

    // 5. Paths de los archivos a crear
    const componentPath = join(basePath, `${componentName}.tsx`);
    const scssPath = join(basePath, `${kebabName}.scss`);
    const storyPath = join(basePath, `${componentName}.stories.tsx`);
    const testPath = join(basePath, `${componentName}.test.tsx`);
    const barrelPath = join(resolve('src', targetDir), 'index.ts');

    // 6. Escribir archivos
    await writeFile(componentPath, componentCode);
    await writeFile(scssPath, scssCode);
    await writeFile(storyPath, storyCode);
    await writeFile(testPath, testCode);

    // 7. Actualizar barrel (index.ts)
    const exportLine = `export * from './${componentName}/${componentName}';\n`;
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
