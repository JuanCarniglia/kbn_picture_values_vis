module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'kbn_picture_values_vis',
    require: ['kibana'],
    uiExports: {
      visTypes: [
        'plugins/kbn_picture_values_vis/kbn_picture_values_vis'
      ]
    }
  });
};
