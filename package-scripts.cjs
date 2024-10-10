const nps = (command) => {
    return `nps -c ./package-scripts.cjs ${command}`;
};

const serially = (...scripts) => {
    return scripts.join(' && ');
};

const defaultConfiguration = {
    options: {
        scripts: false,
        logLevel: 'warn',
        'help-style': 'basic'
    },

    scripts: {
        default: {
            script: nps('help'),
            hiddenFromHelp: true
        },

        dev: {
            script: serially('tsc --noEmit', 'tsx ./src/index.ts'),
            description: 'Run "index.ts" in development mode',
            watch: {
                script: 'tsx ./src/index.ts --watch ./src/**/*.ts',
                description: 'Run "index.ts" in development mode and watch for changes'
            }
        },

        build: {
            script: serially(nps('clean.dist'), 'rollup -c rollup.config.mjs'),
            description: 'Build the application into "dist" folder'
        },

        test: {
            script: serially(nps('clean.coverage'), nps('lint'), 'jest'),
            description: 'Run the tests, including linting',
            watch: {
                script: 'jest --coverage --watch',
                description: 'Run the tests with no linting, and wait for changes'
            }
        },

        doc: {
            script: serially(nps('clean.docs'), 'typedoc'),
            description: 'Run Typedoc and generate docs',
            watch: {
                script: serially(nps('doc'), 'typedoc --watch'),
                description: 'Run Typedoc and generate docs and watch for changes.'
            },
            serve: {
                script: serially(nps('doc'), 'typedoc', 'serve ./docs'),
                description: 'Run Typedoc and generate docs, then serve the docs as HTML',
                watch: {
                    script: serially(
                        nps('doc'),
                        'concurrently --kill-others-on-fail --prefix-colors "bgBlue.bold,bgMagenta.bold" --prefix "[{name}]" --names "typdoc,serve" ' +
                            '"typedoc --watch" "serve ./docs"'
                    ),
                    description: 'Run Typedoc and generate docs and watch for changes while serving the docs as HTML'
                }
            }
        },

        clean: {
            script: serially(nps('clean.dist'), nps('clean.docs'), nps('clean.coverage')),
            description: 'Remove all automatically generated files and folders',
            hiddenFromHelp: true,
            dist: {
                script: 'rimraf ./dist',
                description: 'Delete the dist folder',
                hiddenFromHelp: true
            },
            docs: {
                script: 'rimraf ./docs',
                description: 'Delete the docs folder',
                hiddenFromHelp: true
            },
            coverage: {
                script: 'rimraf ./coverage',
                description: 'Delete the coverage folder',
                hiddenFromHelp: true
            }
        },

        lint: {
            script: 'eslint --format stylish --color',
            description: 'Run ESLint on all the files (src and tests)',
            fix: {
                script: 'eslint --format stylish --color --fix',
                description: 'Run ESLint on all the files (src and tests) with --fix option'
            }
        },

        prettify: {
            script: serially(
                'prettier --no-error-on-unmatched-pattern --write ./.husky/*[^_]',
                'prettier --no-error-on-unmatched-pattern --write ./{.github,.vscode,src,test}/{**,.}/*.{js,jsx,cjs,mjs,ts,tsx,mts,cts,yml,md,json,js}',
                'prettier --no-error-on-unmatched-pattern --write {.czrc,.editorconfig,.gitignore,.npmignore,.npmrc,.prettierrc}',
                'prettier --no-error-on-unmatched-pattern --write ./*.{js,jsx,cjs,mjs,ts,tsx,mts,cts,yml,md,json,js}'
            ),
            description: 'Run Prettier on all the files, writing the results'
        },

        changelog: {
            script: 'conventional-changelog -p angular -i CHANGELOG.md -s',
            description: 'Generate changelog based on commits',
            scratch: {
                script: 'conventional-changelog -p angular -i CHANGELOG.md -s -r 0',
                description: 'Generate changelog based on tags, starting from scratch',
                hiddenFromHelp: true
            },
            hiddenFromHelp: true
        }
    }
};

module.exports = defaultConfiguration;
