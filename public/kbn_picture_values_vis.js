define(function (require) {
  require('ui/agg_table');
  require('ui/agg_table/agg_table_group');

  require('plugins/kbn_picture_values_vis/kbn_picture_values_vis.less');
  require('plugins/kbn_picture_values_vis/kbn_picture_values_vis_controller');

  require('ui/registry/vis_types').register(KbnPictureValuesVisProvider);

  function KbnPictureValuesVisProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    var Schemas = Private(require('ui/Vis/Schemas'));

    return new TemplateVisType({
      name: 'kbn_picture_values',
      title: 'Pics Metrics',
      icon: 'fa-table',
      description: 'Chart displaying values with Pictures',
      template: require('plugins/kbn_picture_values_vis/kbn_picture_values_vis.html'),
      params: {
        defaults: {
          showText: true,
          showValues: true,
          jsonLabels: '[{ "text" : "CUENTA", "letter" : "\uf119", "numeralFormat": "$0,0.0", ' +
          '"ranges" : [{ "min" : 0,    "max": 2000,  "valueColor" : "red",   "letter" : "\uf119"},' +
          '{ "min" : 2000, "max": 10000, "valueColor" : "green", "letter" : "\uf118"}]}]',
          fontSizeLabel: 14,
          fontSizeValue: 14,
          showMetricsAtAllLevels: false
        },
        editor: require('plugins/kbn_picture_values_vis/kbn_picture_values_vis_params.html')
      },
      hierarchicalData: function (vis) {
        return Boolean(vis.params.showPartialRows || vis.params.showMetricsAtAllLevels);
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Value',
          min: 1,
          max: 1,
          defaults: [
            {type: 'count', schema: 'metric'}
          ]
        }
      ]),
      requiresSearch: true
    });
  }

  return KbnPictureValuesVisProvider;
});
