import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  svelte: true,
}).append({
  files: ['**/*.svelte'],
  rules: {
    'import/no-mutable-exports': 'off',
  },
})
