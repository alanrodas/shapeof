const rootDir = '.';
const tsConfigPath = './tsconfig.json';

export default {
    entryPoints: [`${rootDir}/src`],
    entryPointStrategy: 'expand',
    tsconfig: `${tsConfigPath}`,
    compilerOptions: {
        rootDir: `${rootDir}/src`
    },
    out: `${rootDir}/docs`,
    exclude: [
        `${rootDir}/node_modules/**/*`,
        `${rootDir}/**/*.test.ts`,
        `${rootDir}/src/@types/**/*`,
        `${rootDir}/src/index.ts`
    ],
    excludeExternals: true,
    excludeInternal: false,
    excludePrivate: false
};
