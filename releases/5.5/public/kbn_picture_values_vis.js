  import 'ui/agg_table';
  import 'ui/agg_table/agg_table_group';

  import 'plugins/kbn_picture_values_vis/kbn_picture_values_vis.less';
  import 'plugins/kbn_picture_values_vis/kbn_picture_values_vis_controller';

  import {
    TemplateVisTypeProvider
  } from 'ui/template_vis_type/template_vis_type';
  import {
    VisSchemasProvider
  } from 'ui/vis/schemas';
  import kbnPictureValuesVisTemplate from 'plugins/kbn_picture_values_vis/kbn_picture_values_vis.html';

  import {
    VisTypesRegistryProvider
  } from 'ui/registry/vis_types';

  VisTypesRegistryProvider.register(KbnPictureValuesVisProvider);

  function KbnPictureValuesVisProvider(Private) {
    const TemplateVisType = Private(TemplateVisTypeProvider);
    const Schemas = Private(VisSchemasProvider);

    var options = [{
      text: 'CUENTA',
      letter: '\uf119',
      numeralFormat: '$0,0.0',
      ranges: [{
        min: 0,
        max: 2000,
        valueColor: 'red',
        letter: '\uf119'
      }, {
        min: 2000,
        max: 10000,
        valueColor: 'green',
        letter: '\uf118'
      }]
    }];

    return new TemplateVisType({
      name: 'kbn_picture_values',
      title: 'Pics Metrics',
      icon: 'fa-table',
      description: 'Chart displaying values with Pictures',
      template: kbnPictureValuesVisTemplate,
      params: {
        defaults: {
          showText: true,
          showValues: true,
          showPictures: true,
          jsonLabels: JSON.stringify(options),
          fontSizeLabel: 14,
          fontSizeValue: 14,
          showMetricsAtAllLevels: false
        },
        editor: require('plugins/kbn_picture_values_vis/kbn_picture_values_vis_params.html')
      },
      hierarchicalData: function (vis) {
        return Boolean(vis.params.showPartialRows || vis.params.showMetricsAtAllLevels);
      },
      schemas: new Schemas([{
        group: 'metrics',
        name: 'metric',
        title: 'Value',
        min: 1,
        max: 1,
        defaults: [{
          type: 'count',
          schema: 'metric'
        }]
      }]),
      requiresSearch: true
    });
  }

  export default KbnPictureValuesVisProvider;
