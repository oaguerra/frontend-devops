const config = {
    paths: ['tests/acceptance/features/**/*.feature'],
    require: ['tests/acceptance/step_definitions/**/*.ts'],
    requireModule: ['@swc-node/register'],
    format: [
      'summary',
      'progress-bar',
      'html:tests/reports/cucumber_report.html',
    ],
    formatOptions: { snippetInterface: 'async-await' },
  };

export default config