const yaml = require('js-yaml');

function convertYamlToScss(inputFile) {
    const yamlObj = yaml.load(inputFile);
    function yamlToScss(yamlObj, depth = 0) {
        let scss = '';
        const indent = '  '.repeat(depth);
        let hasElse = false;

        for (const key in yamlObj) {
            const value = yamlObj[key];
            const [rule, ...params] = key.split(' ');

            if (rule === 'use') {
                yamlObj[key].forEach((useRule) => {
                    if (typeof useRule === 'string') {
                        scss += `${indent}@use '${useRule}';\n`;
                    } else if (typeof useRule === 'object') {
                        for (const alias in useRule) {
                            scss += `${indent}@use '${useRule[alias]}' as ${alias};\n`;
                        }
                    }
                });
            }
            else if (rule === 'variables') {
                for (const varName in value) {
                    const varValue = formatValue(value[varName]);
                    scss += `${indent}$${varName}: ${varValue};\n`;
                }
            } else if (rule === 'mixins') {
                for (const mixinName in value) {
                    scss += `${indent}@mixin ${mixinName} {\n${yamlToScss(value[mixinName], depth + 1)}${indent}}\n`;
                }
            } else if (rule === 'functions') {
                for (const functionName in value) {
                    const funcDef = value[functionName];
                    const params = funcDef[0].map(p => `$${p}`).join(', ');
                    const body = funcDef[1].split('\n').map(line => `${indent}  ${line}`).join('\n');
                    scss += `${indent}@function ${functionName} (${params}) {\n${body}\n${indent}}\n`;
                }
            } else if (typeof value === 'object') {
                if (key.startsWith('func ')) {
                    const functionName = key.split(' ')[1];
                    const params = value[0].map(p => `$${p}`).join(', ');
                    const body = value[1].split('\n').map(line => `${indent}  ${line}`).join('\n');
                    scss += `${indent}@function ${functionName}(${params}) {\n${body}\n${indent}}\n`;
                } else if (key.startsWith('mxn ')) {
                    const mixinName = key.split(' ')[1];
                    const body = yamlToScss(value, depth + 1);
                    scss += `${indent}@mixin ${mixinName} {\n${body}${indent}}\n`;
                }
                else {
                    const extend = value['extend'] ? `${indent}@extend .${value['extend']};\n` : '';
                    delete value['extend'];

                    const ruleMatch = key.match(/^(\w+)\s+(.*)/);
                    if (true) {
                        //const [, rule, params] = ruleMatch;
                        if (rule === 'each') {
                            const [mark, list] = key.split(' in ');
                            const [, ...variables] = mark.split(' ');
                            console.log('each $color in $theme-colors'.split(' in '));
                            const body = yamlToScss(value, depth + 1);
                            scss += `${indent}@each ${variables.join(', ')} in ${list} {\n${body}${indent}}\n`;
                        } else if (rule === 'for') {
                            const [, variable, , range] = key.split(' ');
                            const [start, end] = range.split('..');
                            const body = yamlToScss(value, depth + 1);
                            scss += `${indent}@for ${variable} from ${start} through ${end} {\n${body}${indent}}\n`;
                        } else if (rule === 'if' || rule === 'elif') {
                            const condition = params.join(' ').trim();
                            const body = yamlToScss(value, depth + 1);
                            scss += `${indent}@${rule == 'if' ? 'if' : 'else if'} ${condition} {\n${body}${indent}}\n`;
                        } else if (key === 'else' && !hasElse) {
                            hasElse = true; // Set flag to true as `else` is processed
                            const elseBody = yamlToScss(value, depth + 1);
                            scss += `${indent}@else {\n${elseBody}${indent}}\n`;
                        } else if (['media', 'font-face', 'keyframes', 'supports', 'document', 'page', 'namespace'].includes(rule)) {
                            const body = yamlToScss(value, depth + 1);
                            scss += `${indent}@${rule} ${params.join(' ')} {\n${body}${indent}}\n`;
                        } else {
                            scss += `${indent}${key} {\n${extend}${yamlToScss(value, depth + 1)}${indent}}\n`;
                        }
                    } else {
                        scss += `${indent}${key} {\n${extend}${yamlToScss(value, depth + 1)}${indent}}\n`;
                    }
                }
            } else {
                if (key.startsWith('include')) {
                    scss += `${indent}${key.replace('include', '@include ')}${value};\n`;
                } else {
                    scss += `${indent}${key}: ${value};\n`;
                }
            }
        }

        return scss;
    }
    function formatValue(value) {
        if (Array.isArray(value)) {
            return '(' + value.map(formatValue).join(', ') + ')';
        } else if (typeof value === 'object' && value !== null) {
            return '(' + Object.entries(value).map(([k, v]) => `${k}: ${formatValue(v)}`).join(', ') + ')';
        } else {
            return value;
        }
    }
    const scssOutput = yamlToScss(yamlObj);
    return scssOutput;
}

module.exports = { convertYamlToScss };