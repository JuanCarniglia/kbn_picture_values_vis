  import _  from 'lodash';
  import ace from 'ace';

  import kbnPictureValuesVisParamsTemplate from 'plugins/kbn_picture_values_vis/kbn_picture_values_vis_params.html';

  import { uiModules } from 'ui/modules';

  uiModules.get('kibana/kbn_picture_values_vis')
  .directive('npsTableVisParams', function () {
    return {
      restrict: 'E',
      template: kbnPictureValuesVisParamsTemplate,
      link: function ($scope) {

        var editor;

        try {
          editor = ace.edit('vis.params.jsonLabels');
        } catch (err) {
          // Nada
        }

        if (editor) {
          editor.getSession().setMode('ace/mode/javascript');
          editor.getSession().setTabSize(4);
          editor.getSession().setUseWrapMode(true);
          editor.setValue(JSON.stringify($scope.vis.params.jsonLabels, undefined, 2));
        }

        $scope.$watchMulti([
          'vis.params.fontSizeLabel',
          'vis.params.fontSizeValue',
          'vis.params.showPictures',
          'vis.params.jsonLabels'
        ], function () {
          if (!$scope.vis) return;
        });
      }
    };
  }
);
